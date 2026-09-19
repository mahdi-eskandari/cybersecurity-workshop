import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/mongodb";
import Service from "../../../model/Service";

type RouteContext = {
  params: Promise<{
    id: string;
    slug: string;
  }>;
};

/* ───────────────── GET ───────────────── */

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const value = String(id || "").trim();

    if (!value) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه یا slug خدمت الزامی است",
        },
        { status: 400 }
      );
    }

    await connectDB();

    let service = null;

    // اگر ObjectId بود
    if (mongoose.Types.ObjectId.isValid(value)) {
      service = await Service.findById(value).lean();
    }

    // اگر ObjectId نبود یا پیدا نشد، با slug بگرد
    if (!service) {
      service = await Service.findOne({
        slug: value.toLowerCase(),
      }).lean();
    }

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          message: "خدمت پیدا نشد",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: service,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/services/[id]:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت اطلاعات خدمت",
      },
      { status: 500 }
    );
  }
}

/* ───────────────── PATCH ───────────────── */

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه خدمت نامعتبر است",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const body = await request.json();

    const {
      slug,
      title,
      shortDesc,
      icon,
      tags,
      level,
      categoryLabel,
      status,

      urgencyContent,

      trackingSteps,
      trackingTitle,

      urgencyTitle,
      urgencyDesc,
      metaTitle,
      metaDescription,
    } = body;

    /* ───────── Validation ───────── */

    if (!slug || !title || !shortDesc) {
      return NextResponse.json(
        {
          success: false,
          message: "slug، عنوان و توضیح کوتاه الزامی هستند",
        },
        { status: 400 }
      );
    }

    /* ───────── Validate tracking steps ───────── */

    if (
      !Array.isArray(trackingSteps) ||
      trackingSteps.length !== 3
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "دقیقاً ۳ مرحله شناسایی باید وارد شود",
        },
        { status: 400 }
      );
    }

    const normalizedTrackingSteps = trackingSteps.map(
      (step: any) => ({
        tag:
          typeof step?.tag === "string"
            ? step.tag.trim()
            : "",

        title:
          typeof step?.title === "string"
            ? step.title.trim()
            : "",

        description:
          typeof step?.description === "string"
            ? step.description.trim()
            : "",

        // فقط اضافه شدن ذخیره آیکون مرحله
        icon:
          typeof step?.icon === "string"
            ? step.icon.trim()
            : "",
      })
    );

    const invalidTrackingStep =
      normalizedTrackingSteps.some(
        (step) =>
          !step.tag ||
          !step.title ||
          !step.description
      );

    if (invalidTrackingStep) {
      return NextResponse.json(
        {
          success: false,
          message:
            "تگ، عنوان و توضیحات هر ۳ مرحله الزامی است",
        },
        { status: 400 }
      );
    }

    /* ───────── Validate urgency content ───────── */

    if (
      !urgencyContent ||
      typeof urgencyContent !== "object"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "محتوای اصلی خدمت الزامی است",
        },
        { status: 400 }
      );
    }

    /* ───────── Check duplicate slug ───────── */

    const normalizedSlug = slug
      .trim()
      .toLowerCase();

    const existingService =
      await Service.findOne({
        slug: normalizedSlug,
        _id: {
          $ne: id,
        },
      });

    if (existingService) {
      return NextResponse.json(
        {
          success: false,
          message:
            "این slug قبلاً برای خدمت دیگری استفاده شده است",
        },
        { status: 409 }
      );
    }

    /* ───────── Update ───────── */

    const updatedService =
      await Service.findByIdAndUpdate(
        id,
        {
          slug: normalizedSlug,

          title: title.trim(),

          shortDesc: shortDesc.trim(),

          icon:
            typeof icon === "string"
              ? icon
              : "",

          tags:
            Array.isArray(tags)
              ? tags
              : [],

          level:
            level ||
            "intermediate",

          categoryLabel:
            categoryLabel || "",

          status:
            status || "draft",

          urgencyContent,

          trackingSteps:
            normalizedTrackingSteps,

          trackingTitle:
            trackingTitle.trim(),

          urgencyTitle:
            urgencyTitle || "",

          urgencyDesc:
            urgencyDesc || "",

          metaTitle:
            metaTitle || "",

          metaDescription:
            metaDescription || "",
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedService) {
      return NextResponse.json(
        {
          success: false,
          message: "خدمت پیدا نشد",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "خدمت با موفقیت ویرایش شد",
        data: updatedService,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "PATCH /api/services/[id]:",
      error
    );

    /* Mongo duplicate key */

    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "این slug قبلاً ثبت شده است",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ویرایش خدمت",
      },
      { status: 500 }
    );
  }
}

/* ───────────────── DELETE ───────────────── */

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه خدمت نامعتبر است",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const deletedService =
      await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return NextResponse.json(
        {
          success: false,
          message: "خدمت پیدا نشد",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "خدمت با موفقیت حذف شد",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "DELETE /api/services/[id]:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "خطا در حذف خدمت",
      },
      { status: 500 }
    );
  }
}