import mongoose, { Schema, model, models, Model } from 'mongoose';

const verificationCodeSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
       expires: 0
    },
  },
  {
    timestamps: true,
  }
);

export default models.VerificationCode || model("VerificationCode", verificationCodeSchema);



