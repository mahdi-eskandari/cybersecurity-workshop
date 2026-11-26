import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import User from "../../../model/User";
import VerificationCode from "../../../model/VerificationCode";
import jwt from "jsonwebtoken";
import { getIp } from "@/lib/ip";
import { retryAfter, record, MIN } from "@/lib/rateLimit";

const FAIL_WINDOW = 15 * MIN;

const fail = (status = 401) =>
  NextResponse.json(
    { error: "اطلاعات ورود یا کد تأیید نادرست است." },
    { status }
  );

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const { username, email, code } = body ?? {};

    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof code !== "string" ||
      !/^\d{6}$/.test(code)
    ) {
      return NextResponse.json({ error: "اطلاعات نامعتبر است." }, { status: 400 });
    }

    const normalizedUsername = username.trim().slice(0, 100);
    const normalizedEmail = email.toLowerCase().trim().slice(0, 200);
    const ip = getIp(req);

    if (
      retryAfter(`adm-login-ip:${ip}`, 10, FAIL_WINDOW) > 0 ||
      retryAfter(`adm-login-mail:${normalizedEmail}`, 5, FAIL_WINDOW) > 0
    ) {
      return NextResponse.json(
        { error: "تلاش‌های ناموفق زیاد است. بعداً دوباره تلاش کنید." },
        { status: 429 }
      );
    }

    await dbConnect();

    const user = await User.findOne({
      username: normalizedUsername,
      email: normalizedEmail,
    });

    const verification = await VerificationCode.findOne({
      email: normalizedEmail,
      code,
    });

    if (
      !user ||
      user.role !== "admin" ||
      !verification ||
      verification.expiresAt < new Date()
    ) {
      record(`adm-login-ip:${ip}`, FAIL_WINDOW);
      record(`adm-login-mail:${normalizedEmail}`, FAIL_WINDOW);
      return fail();
    }

    await VerificationCode.deleteMany({ email: normalizedEmail });

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        username: user.username,
        email: normalizedEmail,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d", algorithm: "HS256" }
    );

    const response = NextResponse.json(
      { message: "ورود با موفقیت انجام شد." },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "خطایی هنگام ورود رخ داد. لطفاً دوباره تلاش کنید." },
      { status: 500 }
    );
  }
}