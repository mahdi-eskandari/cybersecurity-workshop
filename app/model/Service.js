import mongoose from "mongoose";
import { SERVICE_KEYS } from "@/lib/serviceKeys";
const { Schema, model, models } = mongoose;


// سطح‌های مجاز
const LEVELS = [
  "intermediate",
  "specialized",
  "advanced",
  "complex",
];

// وضعیت‌های انتشار
const STATUSES = [
  "active",
  "draft",
  "hidden",
];

const ServiceSchema = new Schema(
  {
    slug: {
      type: String,
      required: [true, "slug الزامی است"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "slug فقط حروف کوچک انگلیسی و خط تیره",
      ],
    },

        // کلید ثابت: انیمیشن، دپارتمان و پلیس‌هولدر مدال بر اساس این وصل می‌شن (با تغییر اسم/slug خراب نمی‌شه)
    key: {
      type: String,
      enum: ["", ...SERVICE_KEYS],
      default: "",
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    trackingTitle: {
      type: String,
      required: true,
      trim: true,
    },

    shortDesc: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    icon: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    level: {
      type: String,
      enum: LEVELS,
      default: "intermediate",
    },

    categoryLabel: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: STATUSES,
      default: "draft",
    },

    body: {
      type: String,
      default: "",
    },

    // محتوای ادیتور بخش هشدار
    urgencyContent: {
      type: Schema.Types.Mixed,
      required: true,
      default: () => ({
        type: "doc",
        content: [],
      }),
    },


    showInFooter: { type: Boolean, default: false },
footerTitle: { type: String, default: "", trim: true },
footerOrder: { type: Number, default: 0 },

    // سه مرحله شناسایی
    trackingSteps: {
      type: [
        {
          tag: {
            type: String,
            required: true,
            trim: true,
          },

          title: {
            type: String,
            required: true,
            trim: true,
          },

          description: {
            type: String,
            required: true,
            trim: true,
          },

          icon: {
            type: String,
            default: "",
            trim: true,
          },


        },
      ],

      required: true,

      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length === 3;
        },

        message: "دقیقاً ۳ مرحله شناسایی باید وارد شود.",
      },
    },

    h1Title: {
  type: String,
  default: "",
  trim: true,
},

index: {
  type: Boolean,
  default: true,
},

follow: {
  type: Boolean,
  default: true,
},

    // برای داده‌های قدیمی
    urgencyTitle: {
      type: String,
      default: "",
    },

    urgencyDesc: {
      type: String,
      default: "",
    },

    // SEO
    metaTitle: {
      type: String,
      default: "",
      maxlength: 60,
    },

    metaDescription: {
      type: String,
      default: "",
      maxlength: 160,
    },

        faqs: {
      type: [
        new Schema(
          {
            question: { type: String, required: true, trim: true, maxlength: 300 },
            answer: { type: String, required: true, trim: true, maxlength: 2000 },
          },
          { _id: false }
        ),
      ],
      default: [],
    },

  },
  {
    timestamps: true,
  }
);

// جلوگیری از OverwriteModel در Next.js hot reload
const Service =
  models.Service || model("Service", ServiceSchema);

export default Service;