import { Schema, model, models } from "mongoose";

const SeoRedirectSchema = new Schema(
  {
    fromPath: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    toPath: {
      type: String,
      required: true,
      trim: true,
    },

    statusCode: {
      type: Number,
      enum: [301, 302],
      default: 301,
    },
  },
  {
    timestamps: true,
  }
);

export default models.SeoRedirect ||
  model("SeoRedirect", SeoRedirectSchema);