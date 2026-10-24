import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import crypto from "crypto";
import { Types } from "mongoose";
import { cookies } from "next/headers";
import { checkVerified, normalizePhone, rateLimit } from "@/lib/otp";
import CrisisReport from "../../model/crisisReport";
import ConfidentialNote from "../../model/ConfidentialNote";

const VALID_INCIDENT_TYPES = [
  "مشاوره",
  "ردیابی رمزارز",
  "کشف هویت",
  "تست نفوذ",
  "کالبدشکافی دیجیتال",
  "مقابله با باج‌افزار",
  "هوش تهدیدات",
  "سایر",
] as const;

const VALID_STATUSES = [
  "pending",
  "reviewing",
  "consulting",
  "resolved",
  "closed",
] as const;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const incidentType =
      typeof body?.incidentType === "string"
        ? body.incidentType.trim()
        : "";

    const serviceSlug =
      typeof body?.serviceSlug === "string"
        ? body.serviceSlug.trim().slice(0, 200)
        : "";

    const serviceTitle =
      typeof body?.serviceTitle === "string"
        ? body.serviceTitle.trim().slice(0, 200)
        : "";

    const isServiceReport = Boolean(serviceSlug);

    const description =
      typeof body?.description === "string"
        ? body.description.trim()
        : "";

    const contact =
      typeof body?.contact === "string"
        ? body.contact.trim()
        : "";

    let finalIncidentType = incidentType;

    if (isServiceReport) {
      // گزارش صفحه‌ی خدمت: نوع = اسم خدمت
      if (!serviceTitle) {
        return NextResponse.json(
          { message: "نام خدمت مشخص نیست" },
          { status: 400 }
        );
      }
      finalIncidentType = serviceTitle;
    } else {
      if (!incidentType) {
        return NextResponse.json(
          { message: "نوع حادثه را انتخاب کنید" },
          { status: 400 }
        );
      }

      if (
        !VALID_INCIDENT_TYPES.includes(
          incidentType as (typeof VALID_INCIDENT_TYPES)[number]
        )
      ) {
        return NextResponse.json(
          { message: "نوع حادثه انتخاب‌شده معتبر نیست" },
          { status: 400 }
        );
      }
    }

    if (!contact) {
      return NextResponse.json(
        { message: "شماره تماس الزامی است" },
        { status: 400 }
      );
    }

        // شماره باید قبلاً با OTP تأیید شده باشد
    const phone = normalizePhone(contact);
    const otpToken = (await cookies()).get("otp_verified")?.value;

    if (!phone || !checkVerified(otpToken, phone)) {
      return NextResponse.json(
        { message: "شماره موبایل تأیید نشده است. دوباره تلاش کنید." },
        { status: 401 }
      );
    }


        // کوکی otp_verified تا ۱۵ دقیقه معتبره؛ جلوی ارسال پشت‌سرهم با همون کوکی رو می‌گیریم
    if (!rateLimit(`report:${phone}`, 3, 60 * 60 * 1000)) {
      return NextResponse.json(
        { message: "تعداد گزارش‌های این شماره زیاد است. بعداً تلاش کنید" },
        { status: 429 }
      );
    }

    if (description.length > 2000) {
      return NextResponse.json(
        { message: "شرح مشکل نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد" },
        { status: 400 }
      );
    }

    await connectDB();

    const trackingCode = `PRH-${crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase()}`;

    const report = await CrisisReport.create({
      trackingCode,
            incidentType: finalIncidentType,
      serviceSlug: isServiceReport ? serviceSlug : undefined,
      serviceTitle: isServiceReport ? serviceTitle || serviceSlug : undefined,
      description,
      contact: phone,
      status: "pending",
    });

        const res = NextResponse.json(
      {
        message: "گزارش با موفقیت ثبت شد",
        trackingCode: report.trackingCode,
      },
      { status: 201 }
    );

    res.cookies.set("report_submitted", report.trackingCode, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15, // 15 دقیقه
      // maxAge: 10, // ۱۰ ثانیه (فقط برای تست)
    });

        res.cookies.set("otp_verified", "", { path: "/", maxAge: 0 });

    return res;
  } catch (error) {
    console.error("Crisis report error:", error);

    return NextResponse.json(
      {
        message:
          process.env.NODE_ENV !== "production" && error instanceof Error
            ? `[DEV] ${error.message}`
            : "خطایی هنگام ثبت گزارش رخ داد",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const reports = await CrisisReport.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        reports,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Crisis reports fetch error:", error);

    return NextResponse.json(
      { message: "خطایی هنگام دریافت پرونده‌ها رخ داد" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const id = String(body?.id || "").trim();
    const status = String(body?.status || "").trim();

    if (!id || !status) {
      return NextResponse.json(
        { message: "شناسه و وضعیت الزامی است" },
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "شناسه پرونده نامعتبر است" },
        { status: 400 }
      );
    }

    if (
      !VALID_STATUSES.includes(
        status as (typeof VALID_STATUSES)[number]
      )
    ) {
      return NextResponse.json(
        { message: "وضعیت نامعتبر است" },
        { status: 400 }
      );
    }

    await connectDB();

    const report = await CrisisReport.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!report) {
      return NextResponse.json(
        { message: "پرونده پیدا نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "وضعیت پرونده بروزرسانی شد",
        report,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Crisis report status update error:", error);

    return NextResponse.json(
      { message: "خطایی هنگام بروزرسانی وضعیت رخ داد" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();

    const body = await request.json().catch(() => ({}));
    const id = String(body?.id || "").trim();

    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "شناسه پرونده نامعتبر است." },
        { status: 400 }
      );
    }

    const deletedReport = await CrisisReport.findByIdAndDelete(id);

    if (!deletedReport) {
      return NextResponse.json(
        { message: "پرونده پیدا نشد." },
        { status: 404 }
      );
    }

    // یادداشت‌های محرمانه مربوط به پرونده هم پاک می‌شوند.
    await ConfidentialNote.deleteMany({
      reportId: id,
    });

    return NextResponse.json(
      {
        message: "پرونده با موفقیت حذف شد.",
        reportId: deletedReport._id.toString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE crisis report error:", error);

    return NextResponse.json(
      { message: "حذف پرونده انجام نشد." },
      { status: 500 }
    );
  }
}