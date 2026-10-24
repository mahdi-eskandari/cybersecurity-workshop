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
  },
  { timestamps: true }
);

export default models.Category || model("Category", CategorySchema);