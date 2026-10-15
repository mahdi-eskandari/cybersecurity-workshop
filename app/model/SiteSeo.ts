// app/model/SiteSeo.ts
import { Schema, model, models } from "mongoose";

// تنظیمات سراسری سئو — فقط یک رکورد (key = "site")
const SiteSeoSchema = new Schema(
  {
    key: {
      type: String,
      default: "site",
      unique: true,
      trim: true,
    },

    // کلید اصلی: noindex + nofollow + Disallow کل سایت
    noindexAll: { type: Boolean, default: false },

    // متا robots روی همه‌ی صفحات
    globalNoindex: { type: Boolean, default: false },
    globalNofollow: { type: Boolean, default: false },

    // robots.txt
    robotsDisallowAll: { type: Boolean, default: false },
    includeSitemap: { type: Boolean, default: true },
    extraDisallow: { type: [String], default: [] },
    robotsCustomText: { type: String, default: "", maxlength: 5000 },

        // برند و شبکه‌های اجتماعی
    siteName: { type: String, default: "", maxlength: 100 },
    siteUrl: { type: String, default: "", maxlength: 300 },
    googleVerification: { type: String, default: "", maxlength: 200 },
    twitterHandle: { type: String, default: "", maxlength: 40 },
    orgEmail: { type: String, default: "", maxlength: 200 },
    orgPhone: { type: String, default: "", maxlength: 30 },
    defaultOgImage: { type: String, default: "", maxlength: 500 },
    defaultOgImageAlt: { type: String, default: "", maxlength: 200 },
  },
  {
    timestamps: true,
  }
);

export default models.SiteSeo || model("SiteSeo", SiteSeoSchema);
