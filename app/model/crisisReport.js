import { Schema, model, models } from "mongoose";



const CrisisReportSchema = new Schema(
  {
    trackingCode: {
      type: String,
      required: true,
      unique: true,
    },

    incidentType: {
      type: String,
      enum: ["مزاحمت و اخاذی", "هک و نفوذ", "سرقت کریپتو"],
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    contact: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "in_progress", "resolved", "closed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default models.CrisisReport || model("CrisisReport", CrisisReportSchema);