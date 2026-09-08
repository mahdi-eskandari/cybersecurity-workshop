import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import crypto from "crypto";
import CrisisReport from "../../model/crisisReport";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      incidentType,
      description,
      contact,
    } = body;

    if (!incidentType) {
      return NextResponse.json(
        { message: "نوع حادثه را انتخاب کنید" },
        { status: 400 }
      );
    }

    if (!contact) {
      return NextResponse.json(
        { message: "شماره تماس یا آیدی تلگرام الزامی است" },
        { status: 400 }
      );
    }

    if (description && description.length > 2000) {
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
      incidentType,
      description: description || "",
      contact,
      status: "pending",
    });

    return NextResponse.json(
      {
        message: "گزارش با موفقیت ثبت شد",
        trackingCode: report.trackingCode,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Crisis report error:", error);

    return NextResponse.json(
      { message: "خطایی هنگام ثبت گزارش رخ داد" },
      { status: 500 }
    );
  }
}