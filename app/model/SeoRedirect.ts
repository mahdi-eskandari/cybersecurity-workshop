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
      required: false,
      default: "",
      trim: true,
    },

    statusCode: {
      type: Number,
      enum: [301, 302, 307, 308, 410],
      default: 301,
    },

    matchType: {
      type: String,
      enum: ["exact", "regex"],
      default: "exact",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    reason: {
      type: String,
      default: "",
      trim: true,
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  }
);

export default models.SeoRedirect ||
  model("SeoRedirect", SeoRedirectSchema);