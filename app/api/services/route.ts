import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '../../model/Service';

export async function GET() {
  try {
    await connectDB();

    const services = await Service.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("GET /api/services:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت خدمات",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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
      body: mainBody,
      urgencyContent,
      trackingSteps,
      trackingTitle,
      metaTitle,
      metaDescription,
    } = body;

    if (!slug?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Slug الزامی است",
        },
        { status: 400 }
      );
    }

    if (!title?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "عنوان خدمت الزامی است",
        },
        { status: 400 }
      );
    }

    if (!shortDesc?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "توضیح کوتاه الزامی است",
        },
        { status: 400 }
      );
    }

    if (
      !Array.isArray(trackingSteps) ||
      trackingSteps.length !== 3
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "دقیقاً ۳ مرحله شناسایی باید وارد شود.",
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
            "تگ، عنوان و توضیحات هر ۳ مرحله شناسایی الزامی است.",
        },
        { status: 400 }
      );
    }

    const normalizedSlug = slug
      .trim()
      .toLowerCase();

    const existingService =
      await Service.findOne({
        slug: normalizedSlug,
      });

    if (existingService) {
      return NextResponse.json(
        {
          success: false,
          message: "این Slug قبلاً استفاده شده است",
        },
        { status: 409 }
      );
    }

    const service = await Service.create({
      slug: normalizedSlug,

      title: title.trim(),

      shortDesc: shortDesc.trim(),

      icon:
        typeof icon === "string"
          ? icon.trim()
          : "",

      tags:
        Array.isArray(tags)
          ? tags
              .map((tag: unknown) =>
                String(tag).trim()
              )
              .filter(Boolean)
          : [],

      level:
        level || "intermediate",

      categoryLabel:
        typeof categoryLabel === "string"
          ? categoryLabel.trim()
          : "",

      status:
        status || "draft",

      body:
        typeof mainBody === "string"
          ? mainBody
          : "",

      urgencyContent:
        urgencyContent &&
        typeof urgencyContent === "object"
          ? urgencyContent
          : {
              type: "doc",
              content: [],
            },

      trackingSteps:
        normalizedTrackingSteps,

        trackingTitle: trackingTitle.trim(),

      metaTitle:
        typeof metaTitle === "string"
          ? metaTitle.trim()
          : "",

      metaDescription:
        typeof metaDescription === "string"
          ? metaDescription.trim()
          : "",
    });

    return NextResponse.json(
      {
        success: true,
        data: service,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error("POST /api/services:", error);

    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "این Slug قبلاً ثبت شده است",
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ایجاد خدمت",
      },
      {
        status: 500,
      }
    );
  }
}