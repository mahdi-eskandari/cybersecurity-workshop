import mongoose from "mongoose";

export const FEEDBACK_SUBJECTS = [
  "partnership",
  "other",
];

const FeedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    contact: {
      type: String,
      trim: true,
      maxlength: 160,
      default: "",
    },

    subject: {
      type: String,
      required: true,
      enum: FEEDBACK_SUBJECTS,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 5000,
    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "feedbacks",
  }
);

const Feedback =
  mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);

export default Feedback;