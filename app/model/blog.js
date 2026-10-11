import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    content: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    postType: {
      type: String,
      enum: ["normal", "special"],
      default: "normal",
      required: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    categoryId: {
      type: String,
      required: true,
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    featuredImage: {
      type: String,
      default: null,
    },

    featuredImageAlt: {
      type: String,
      default: null,
      trim: true,
    },

    wordCount: {
      type: Number,
      default: 0,
    },

    readingTime: {
      type: Number,
      default: 0,
    },

    metaTitle: {
      type: String,
      required: true,
      trim: true,
    },

    metaDescription: {
      type: String,
      required: true,
      trim: true,
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
  },
  { timestamps: true }
);

export default models.Post || model("Post", PostSchema);
