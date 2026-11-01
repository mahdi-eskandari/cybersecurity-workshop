// import { NextResponse } from "next/server";
// import connectDB from "@/lib/mongodb";
// import Post from "../../../model/blog";
// import SeoRedirect from "../../../model/SeoRedirect";
// import PageSeo from "../../../model/PageSeo";

// export async function PATCH(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();

//     const { id } = await params;
//     const body = await request.json();

//     if (
//       body.postType !== undefined &&
//       body.postType !== "normal" &&
//       body.postType !== "special"
//     ) {
//       return NextResponse.json(
//         { message: "نوع پست معتبر نیست" },
//         { status: 400 }
//       );
//     }

// const oldPost = await Post.findById(id).select("slug").lean();

//     const post = await Post.findByIdAndUpdate(
//       id,
//       body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     ).lean();

//     if (!post) {
//       return NextResponse.json(
//         { message: "پست پیدا نشد" },
//         { status: 404 }
//       );
//     }

//     const newSlug = String(body.slug || "").trim().toLowerCase();

// if (oldPost && newSlug && oldPost.slug !== newSlug) {
//   const base = await PageSeo.findOne({ pageKey: "blogs" }).select("slug").lean();
//   const baseSlug = (base as any)?.slug || "blogs";

//   const oldPath = `/${baseSlug}/${oldPost.slug}`;
//   const newPath = `/${baseSlug}/${newSlug}`;

//   await SeoRedirect.updateMany({ toPath: oldPath }, { $set: { toPath: newPath } });
//   await SeoRedirect.deleteMany({ fromPath: newPath });
//   await SeoRedirect.findOneAndUpdate(
//     { fromPath: oldPath },
//     { $set: { toPath: newPath, statusCode: 301 } },
//     { upsert: true }
//   );
// }

//     return NextResponse.json(post);
//   } catch (error: any) {
//   console.error("PATCH /api/posts/[id] error:", error);

//   if (error?.code === 11000) {
//     return NextResponse.json(
//       { message: "این Slug قبلاً استفاده شده است" },
//       { status: 409 }
//     );
//   }

//   if (error?.name === "ValidationError") {
//     return NextResponse.json(
//       {
//         message: "اطلاعات پست معتبر نیست",
//         errors: error.errors,
//       },
//       { status: 400 }
//     );
//   }

//   return NextResponse.json(
//     { message: "خطا در ویرایش پست" },
//     { status: 500 }
//   );
// }
// }

// export async function DELETE(
//   _request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();

//     const { id } = await params;

//     const post = await Post.findByIdAndDelete(id).lean();

//     if (!post) {
//       return NextResponse.json(
//         { message: "پست پیدا نشد" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(post);
//   } catch (error) {
//     console.error("DELETE /api/posts/[id] error:", error);

//     return NextResponse.json(
//       { message: "خطا در حذف پست" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Types } from "mongoose";
import { isAdmin } from "@/lib/adminAuth";
import Post from "../../../model/blog";
import SeoRedirect from "../../../model/SeoRedirect";
import PageSeo from "../../../model/PageSeo";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // دفاع در عمق: علاوه بر middleware، خود route هم ادمین بودن رو چک می‌کنه
    if (!(await isAdmin())) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "شناسه پست نامعتبر است" },
        { status: 400 }
      );
    }

    await connectDB();

    const rawBody = await request.json();

    if (!rawBody || typeof rawBody !== "object" || Array.isArray(rawBody)) {
      return NextResponse.json(
        { message: "اطلاعات ارسالی نامعتبر است" },
        { status: 400 }
      );
    }

    const body = rawBody as Record<string, any>;

    // کلیدهای خطرناک (عملگرهای mongo و فیلدهای سیستمی) حذف می‌شن
    const safeBody = Object.fromEntries(
      Object.entries(body).filter(
        ([key]) =>
          !key.startsWith("$") &&
          !key.includes(".") &&
          key !== "_id" &&
          key !== "__v"
      )
    );

    if (
      body.postType !== undefined &&
      body.postType !== "normal" &&
      body.postType !== "special"
    ) {
      return NextResponse.json(
        { message: "نوع پست معتبر نیست" },
        { status: 400 }
      );
    }

const oldPost = await Post.findById(id).select("slug").lean();

    const post = await Post.findByIdAndUpdate(
      id,
      { $set: safeBody },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!post) {
      return NextResponse.json(
        { message: "پست پیدا نشد" },
        { status: 404 }
      );
    }

    const newSlug = String(body.slug || "").trim().toLowerCase();

if (oldPost && newSlug && oldPost.slug !== newSlug) {
  const base = await PageSeo.findOne({ pageKey: "blogs" }).select("slug").lean();
  const baseSlug = (base as any)?.slug || "blogs";

  const oldPath = `/${baseSlug}/${oldPost.slug}`;
  const newPath = `/${baseSlug}/${newSlug}`;

  await SeoRedirect.updateMany({ toPath: oldPath }, { $set: { toPath: newPath } });
  await SeoRedirect.deleteMany({ fromPath: newPath });
  await SeoRedirect.findOneAndUpdate(
    { fromPath: oldPath },
    { $set: { toPath: newPath, statusCode: 301 } },
    { upsert: true }
  );
}

    return NextResponse.json(post);
  } catch (error: any) {
  console.error("PATCH /api/posts/[id] error:", error);

  if (error?.code === 11000) {
    return NextResponse.json(
      { message: "این Slug قبلاً استفاده شده است" },
      { status: 409 }
    );
  }

  if (error?.name === "ValidationError") {
    return NextResponse.json(
      {
        message: "اطلاعات پست معتبر نیست",
        errors: error.errors,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "خطا در ویرایش پست" },
    { status: 500 }
  );
}
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // دفاع در عمق: علاوه بر middleware، خود route هم ادمین بودن رو چک می‌کنه
    if (!(await isAdmin())) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "شناسه پست نامعتبر است" },
        { status: 400 }
      );
    }

    await connectDB();

    const post = await Post.findByIdAndDelete(id).lean();

    if (!post) {
      return NextResponse.json(
        { message: "پست پیدا نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("DELETE /api/posts/[id] error:", error);

    return NextResponse.json(
      { message: "خطا در حذف پست" },
      { status: 500 }
    );
  }
}