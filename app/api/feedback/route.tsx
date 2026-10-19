import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Feedback, {
  FEEDBACK_SUBJECTS,
} from "../../model/feedback";
import { verifyTurnstile } from "@/lib/turnstile";
import { claimToken } from "@/lib/tokenGuard";
import { getIp, retryAfter, record, MIN, HOUR } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI is not configured"
    );
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(uri);
}

/* -------------------------------------------------------------------------- */
/* GET */
/* -------------------------------------------------------------------------- */

export async function GET(request: Request) {
  try {
    await connectDatabase();

    const { searchParams } =
      new URL(request.url);

    const status = searchParams.get("status");
    const subject = searchParams.get("subject");
    const q = searchParams.get("q");

    const filter: Record<string, any> = {};

    if (
      status &&
      ["pending", "approved", "rejected"].includes(
        status
      )
    ) {
      filter.approvalStatus = status;
    }

    if (
      subject &&
      FEEDBACK_SUBJECTS.includes(
        subject as (typeof FEEDBACK_SUBJECTS)[number]
      )
    ) {
      filter.subject = subject;
    }

    if (q?.trim()) {
      const search = q.trim();

      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          contact: {
            $regex: search,
            $options: "i",
          },
        },
        {
          message: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const feedbacks = await Feedback.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      feedbacks,
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "GET /api/feedback error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "دریافت بازخوردها انجام نشد.",
      },
      { status: 500 }
    );
  }
}

/* -------------------------------------------------------------------------- */
/* POST */
/* -------------------------------------------------------------------------- */

const LIMITS = [
  { id: "main", limit: 3, windowMs: HOUR },      // ۳ بار، بعدش حدود ۱ ساعت قفل
] as const;

const FAIL_LIMIT = 10;
const FAIL_WINDOW = 10 * MIN;

function tooMany(seconds: number) {
  const t =
    seconds >= 3600 ? `${Math.ceil(seconds / 3600)} ساعت` :
    seconds > 90 ? `${Math.ceil(seconds / 60)} دقیقه` :
    `${seconds} ثانیه`;
  return NextResponse.json(
    { message: `تعداد ارسال‌های شما به حد مجاز رسیده است. لطفاً ${t} دیگر دوباره تلاش کنید.` },
    { status: 429, headers: { "Retry-After": String(seconds) } }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body?.name === "string"
        ? body.name.trim()
        : "";

    const contact =
      typeof body?.contact === "string"
        ? body.contact.trim()
        : "";

    const subject =
      typeof body?.subject === "string"
        ? body.subject.trim()
        : "";

    const message =
      typeof body?.message === "string"
        ? body.message.trim()
        : "";


    const turnstileToken =
  typeof body?.turnstileToken === "string" ? body.turnstileToken : "";

    if (
      name.length < 2 ||
      name.length > 100
    ) {
      return NextResponse.json(
        {
          message:
            "نام باید بین ۲ تا ۱۰۰ کاراکتر باشد.",
        },
        { status: 400 }
      );
    }

    if (
      !FEEDBACK_SUBJECTS.includes(
        subject as (typeof FEEDBACK_SUBJECTS)[number]
      )
    ) {
      return NextResponse.json(
        {
          message:
            "موضوع پیام معتبر نیست.",
        },
        { status: 400 }
      );
    }

    if (
      message.length < 10 ||
      message.length > 3500
    ) {
      return NextResponse.json(
        {
          message:
            "متن پیام باید بین ۱۰ تا ۵۰۰۰ کاراکتر باشد.",
        },
        { status: 400 }
      );
    }

    if (contact.length > 160) {
      return NextResponse.json(
        {
          message:
            "اطلاعات تماس بیش از حد طولانی است.",
        },
        { status: 400 }
      );
    }


    const ip = getIp(request);

// ۱) چک لیمیت‌ها (چیزی ثبت نمی‌کند)
for (const l of LIMITS) {
  const wait = retryAfter(`feedback:${l.id}:${ip}`, l.limit, l.windowMs);
  if (wait > 0) return tooMany(wait);
}
const failWait = retryAfter(`feedback:fail:${ip}`, FAIL_LIMIT, FAIL_WINDOW);
if (failWait > 0) return tooMany(failWait);

// ۲) توکن خالی یا تکراری
if (!turnstileToken || !claimToken(turnstileToken)) {
  record(`feedback:fail:${ip}`, FAIL_WINDOW);
  return NextResponse.json(
    { message: "تأیید امنیتی نامعتبر یا منقضی شده است. لطفاً دوباره تلاش کنید." },
    { status: 400 }
  );
}

// ۳) تأیید توکن با کلادفلر
const human = await verifyTurnstile(turnstileToken, ip);
if (!human) {
  record(`feedback:fail:${ip}`, FAIL_WINDOW);
  return NextResponse.json(
    { message: "تأیید امنیتی ناموفق بود. لطفاً دوباره تلاش کنید." },
    { status: 403 }
  );
}

// ۴) ثبت در لیمیت‌ها
for (const l of LIMITS) record(`feedback:${l.id}:${ip}`, l.windowMs);

    await connectDatabase();

    const feedback = await Feedback.create({
      name,
      contact,
      subject,
      message,

      // مهم:
      approvalStatus: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        id: feedback._id.toString(),
        message:
          "پیام شما با موفقیت ثبت شد.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "POST /api/feedback error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "خطایی در ثبت پیام رخ داد. لطفاً دوباره تلاش کنید.",
      },
      { status: 500 }
    );
  }
}

/* -------------------------------------------------------------------------- */
/* PATCH */
/* -------------------------------------------------------------------------- */

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const id =
      typeof body?.id === "string"
        ? body.id.trim()
        : "";

    const approvalStatus =
      typeof body?.approvalStatus === "string"
        ? body.approvalStatus.trim()
        : "";

    if (!id) {
      return NextResponse.json(
        {
          message:
            "شناسه بازخورد ارسال نشده است.",
        },
        { status: 400 }
      );
    }

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          message:
            "شناسه بازخورد معتبر نیست.",
        },
        { status: 400 }
      );
    }

    if (
      !["pending", "approved", "rejected"].includes(
        approvalStatus
      )
    ) {
      return NextResponse.json(
        {
          message:
            "وضعیت بازخورد معتبر نیست.",
        },
        { status: 400 }
      );
    }

    await connectDatabase();

    const feedback =
      await Feedback.findByIdAndUpdate(
        id,
        {
          $set: {
            approvalStatus,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      ).lean();

    if (!feedback) {
      return NextResponse.json(
        {
          message:
            "بازخورد موردنظر پیدا نشد.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      feedback,
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "PATCH /api/feedback error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "تغییر وضعیت بازخورد انجام نشد.",
      },
      { status: 500 }
    );
  }
}

/* -------------------------------------------------------------------------- */
/* DELETE */
/* -------------------------------------------------------------------------- */

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const id =
      typeof body?.id === "string"
        ? body.id.trim()
        : "";

    if (!id) {
      return NextResponse.json(
        {
          message:
            "شناسه بازخورد ارسال نشده است.",
        },
        { status: 400 }
      );
    }

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          message:
            "شناسه بازخورد معتبر نیست.",
        },
        { status: 400 }
      );
    }

    await connectDatabase();

    const deleted =
      await Feedback.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        {
          message:
            "بازخورد موردنظر پیدا نشد.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "بازخورد با موفقیت حذف شد.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "DELETE /api/feedback error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "حذف بازخورد انجام نشد.",
      },
      { status: 500 }
    );
  }
}