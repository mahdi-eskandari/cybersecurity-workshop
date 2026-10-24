import { Schema, model, models } from "mongoose";

const INCIDENT_TYPES = [
  "مشاوره",
  "ردیابی رمزارز",
  "کشف هویت",
  "تست نفوذ",
  "کالبدشکافی دیجیتال",
  "مقابله با باج‌افزار",
  "هوش تهدیدات",
  "سایر",
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
      required: true,
      trim: true,
      maxlength: 200,
      validate: {
        // گزارش صفحه‌ی خدمت: اسم خدمت؛ بقیه: فقط ۸ نوع ثابت
        validator: function (this: { serviceSlug?: string }, v: string) {
          return (
            Boolean(this.serviceSlug) ||
            (INCIDENT_TYPES as readonly string[]).includes(v)
          );
        },
        message: "نوع حادثه معتبر نیست",
      },
    },

    // وقتی گزارش از صفحه‌ی یه خدمت ثبت شده
    serviceSlug: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    serviceTitle: {
      type: String,
      trim: true,
      maxlength: 200,
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
      match: [
        /^(\+98|0098|98|0)?9\d{9}$/,
        "شماره موبایل معتبر نیست",
      ],
    },

    status: {
      type: String,
      enum: ["pending", "reviewing", "consulting", "resolved", "closed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default models.CrisisReport ||
  model("CrisisReport", CrisisReportSchema);