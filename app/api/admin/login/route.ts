
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import User from "../../../model/User";
import VerificationCode from "../../../model/VerificationCode";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "ایمیل و کد تأیید الزامی هستند." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    await dbConnect();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return NextResponse.json(
        { error: "کاربری با این ایمیل پیدا نشد." },
        { status: 404 }
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "دسترسی غیرمجاز است." },
        { status: 403 }
      );
    }

    const verification = await VerificationCode.findOne({
      email: normalizedEmail,
      code,
    });

    if (!verification) {
      return NextResponse.json(
        { error: "کد تأیید نادرست است." },
        { status: 401 }
      );
    }

    if (verification.expiresAt < new Date()) {
      await VerificationCode.deleteOne({
        _id: verification._id,
      });

      return NextResponse.json(
        { error: "کد تأیید منقضی شده است. لطفاً دوباره درخواست کد کنید." },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: normalizedEmail,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    await VerificationCode.deleteOne({
      _id: verification._id,
    });

    const response = NextResponse.json(
      {
        message: "ورود با موفقیت انجام شد.",
      },
      { status: 200 }
    );

    response.cookies.delete("token");

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
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

