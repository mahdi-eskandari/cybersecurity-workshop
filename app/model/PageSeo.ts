import { Schema, model, models } from "mongoose";

const PageSeoSchema = new Schema(
  {
    // شناسه ثابت صفحه
    // این مقدار نباید با تغییر slug تغییر کند.
    pageKey: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    // نام صفحه برای نمایش در پنل
    pageName: {
      type: String,
      required: true,
      trim: true,
    },

    // عنوان اصلی H1 صفحه
    h1Title: {
      type: String,
      required: true,
      trim: true,
    },

    // آدرس فعلی صفحه
    // مثال: services
    // خروجی: /services
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug فقط می‌تواند شامل حروف انگلیسی، عدد و خط تیره باشد.",
      ],
    },

    // عنوان SEO
    metaTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 70,
    },

    // توضیحات SEO
    metaDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 170,
    },

    // robots index
    index: {
      type: Boolean,
      default: true,
    },

    // robots follow
    follow: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.PageSeo || model("PageSeo", PageSeoSchema);