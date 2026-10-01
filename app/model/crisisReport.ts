import { Schema, model, models } from "mongoose";

const INCIDENT_TYPES = [
  "مشاوره",
  "ردیابی رمزارز",
  " کشف هویت",
  "تست نفوذ",
  "کالبدشکافی دیجیتال",
  "مقابله با باج‌افزار",
  "هوش تهدیدات",
] as const;

const CrisisReportSchema = new Schema(
  {
    trackingCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    incidentType: {
      type: String,
      enum: INCIDENT_TYPES,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    contact: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "reviewing",
        "consulting",
        "resolved",
        "closed",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default models.CrisisReport ||
  model("CrisisReport", CrisisReportSchema);