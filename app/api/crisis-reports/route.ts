import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import crypto from "crypto";
import CrisisReport from "../../model/crisisReport";
import { Types } from "mongoose";
import ConfidentialNote from "../../model/ConfidentialNote";

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
    const { id, status } = body;

    const allowedStatuses = [
      "pending",
      "reviewing",
      "consulting",
      "resolved",
      "closed",
    ];

    if (!id || !status) {
      return NextResponse.json(
        { message: "شناسه و وضعیت الزامی است" },
        { status: 400 }
      );
    }

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { message: "وضعیت نامعتبر است" },
        { status: 400 }
      );
    }

    await connectDB();

    const report = await CrisisReport.findByIdAndUpdate(
      id,
      { status },
      { new: true }
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
    await ConfidentialNote.deleteMany({ reportId: id });

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