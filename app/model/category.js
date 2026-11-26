import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    order: { type: Number, default: 0 },

    // ───── سئوی اختصاصی دسته (همه اختیاری) ─────
    metaTitle: { type: String, default: "", trim: true, maxlength: 70 },
    metaDescription: { type: String, default: "", trim: true, maxlength: 170 },
    ogImage: { type: String, default: "", trim: true, maxlength: 500 },
    ogImageAlt: { type: String, default: "", trim: true, maxlength: 200 },
    index: { type: Boolean, default: true },
    follow: { type: Boolean, default: true },
        canonical: { type: String, default: "", trim: true, maxlength: 500 },
  },
  { timestamps: true }
);

export default models.Category || model("Category", CategorySchema);