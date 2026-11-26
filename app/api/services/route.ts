import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '../../model/Service';
import { isAdmin } from "@/lib/adminAuth";
import { normalizeServiceKey } from "@/lib/serviceKeys";
import { parseCanonical } from "@/lib/seoFields";
import { cleanSvg } from "@/lib/sanitize";

function normalizeFaqs(faqs: unknown) {
  if (!Array.isArray(faqs)) return [];

  return faqs
    .map((item: any) => ({
      question: typeof item?.question === "string" ? item.question.trim() : "",
      answer: typeof item?.answer === "string" ? item.answer.trim() : "",
    }))
    .filter((item) => item.question && item.answer);
}

export async function GET(request: Request) {
  try {
    await connectDB();

    const menuOnly =
      new URL(request.url).searchParams.get("fields") === "menu";
    const admin = await isAdmin();

    const query = Service.find(admin ? {} : { status: "active" }).sort({
      createdAt: -1,
    });

if (menuOnly) query.select("slug title status");

    const services = await query.lean();

    return NextResponse.json(
      { success: true, data: services },
      admin
        ? undefined
        : { headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=120" } }
    );
  } catch (error) {
    console.error("GET /api/services:", error);
    return NextResponse.json(
      { success: false, message: "خطا در دریافت خدمات" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {

    if (!(await isAdmin())) {
      return NextResponse.json(
        { success: false, message: "دسترسی غیرمجاز" },
        { status: 403 }
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
      body: mainBody,
      urgencyContent,
      trackingSteps,
      trackingTitle,
      metaTitle,
      metaDescription,
      faqs,
       index,
      follow,
      key,  
      canonical
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


        const canonicalResult = parseCanonical(canonical);
    if ("error" in canonicalResult) {
      return NextResponse.json({ success: false, message: canonicalResult.error }, { status: 400 });
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

icon: cleanSvg(step?.icon),
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

       key: normalizeServiceKey(key), 

      title: title.trim(),

      shortDesc: shortDesc.trim(),

icon: cleanSvg(icon),

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

      trackingTitle:
        typeof trackingTitle === "string"
          ? trackingTitle.trim()
          : "",

      metaTitle:
        typeof metaTitle === "string"
          ? metaTitle.trim()
          : "",

      metaDescription:
        typeof metaDescription === "string"
          ? metaDescription.trim()
          : "",


                faqs: normalizeFaqs(faqs),

            index: typeof index === "boolean" ? index : true,
      follow: typeof follow === "boolean" ? follow : true,
      canonical: canonicalResult.value,
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
