import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import User from "../../../model/User";
import VerificationCode from "../../../model/VerificationCode";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../../../../lib/mail";
import { getIp } from "@/lib/ip";
import { retryAfter, record, MIN } from "@/lib/rateLimit";

const FAIL_WINDOW = 15 * MIN;
const DUMMY_HASH = bcrypt.hashSync("dummy-password", 10);



export async function POST(req: Request) {

  try {
    await dbConnect();

    const body = await req.json().catch(() => null);
    const { username, email, password } = body ?? {};

    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !username || !email || !password || password.length > 200
    ) {
      return NextResponse.json(
        { message: "نام کاربری، ایمیل و رمز عبور الزامی است." },
        { status: 400 }
      );
    }

    const normalizedUsername = username.trim().slice(0, 100);
    const normalizedEmail = email.toLowerCase().trim().slice(0, 200);
    const ip = getIp(req);

    if (
      retryAfter(`adm-verify-ip:${ip}`, 10, FAIL_WINDOW) > 0 ||
      retryAfter(`adm-verify-mail:${normalizedEmail}`, 5, FAIL_WINDOW) > 0
    ) {
      return NextResponse.json(
        { message: "تعداد تلاش‌ها زیاد است. بعداً دوباره تلاش کنید." },
        { status: 429 }
      );
    }

    // هر تلاش (موفق یا ناموفق) شمرده می‌شود تا ایمیل‌بمب هم ممکن نباشد
    record(`adm-verify-ip:${ip}`, FAIL_WINDOW);
    record(`adm-verify-mail:${normalizedEmail}`, FAIL_WINDOW);

    await dbConnect();

    const user = await User.findOne({
      username: normalizedUsername,
      email: normalizedEmail,
    });

    // bcrypt همیشه اجرا شود تا با زمان پاسخ نشود کاربر را حدس زد
    const isPasswordValid = await bcrypt.compare(
      password,
      user && user.role === "admin" ? user.password : DUMMY_HASH
    );

    if (!user || user.role !== "admin" || !isPasswordValid) {
      return NextResponse.json(
        { message: "نام کاربری، ایمیل یا رمز عبور اشتباه است." },
        { status: 401 }
      );
    }

    await VerificationCode.deleteMany({
      email: normalizedEmail,
    });

    const verificationCode = crypto
      .randomInt(100000, 1000000)
      .toString();

    await VerificationCode.create({
      email: normalizedEmail,
      code: verificationCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    console.log(
      "verificationCode:",
      verificationCode
    );

    sendVerificationEmail(
      normalizedEmail,
      verificationCode
    ).catch((err) => {
      console.error(
        "Background email sending failed:",
        err
      );
    });

    return NextResponse.json(
      {
        message: "کد تأیید با موفقیت ارسال شد.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify error:", error);

    return NextResponse.json(
      { message: "خطایی در سرور رخ داد." },
      { status: 500 }
    );
  }
}