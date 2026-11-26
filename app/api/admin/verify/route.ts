import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import User from "../../../model/User";
import VerificationCode from "../../../model/VerificationCode";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../../../../lib/mail";

export async function POST(req: Request) {
  console.log("🔥 VERIFY ROUTE HIT");

  try {
    await dbConnect();

    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        {
          message:
            "نام کاربری، ایمیل و رمز عبور الزامی است.",
        },
        { status: 400 }
      );
    }

    const normalizedUsername = username.trim();
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      username: normalizedUsername,
      email: normalizedEmail,
    });

    if (!user) {
      return NextResponse.json(
        { message: "نام کاربری، ایمیل یا رمز عبور اشتباه است." },
        { status: 401 }
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { message: "دسترسی غیرمجاز است." },
        { status: 403 }
      );
    }



const isPasswordValid = await bcrypt.compare(
  password,
  user.password
);


    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message:
            "نام کاربری، ایمیل یا رمز عبور اشتباه است.",
        },
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