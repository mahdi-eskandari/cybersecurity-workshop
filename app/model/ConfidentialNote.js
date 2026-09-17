import { Schema, model, models } from "mongoose";

const ConfidentialNoteSchema = new Schema(
  {
    reportId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
  },
  {
    timestamps: true,
  }
);

ConfidentialNoteSchema.index({ reportId: 1, createdAt: -1 });

export default models.ConfidentialNote || model("ConfidentialNote", ConfidentialNoteSchema);
