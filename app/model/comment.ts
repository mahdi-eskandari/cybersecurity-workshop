import { Schema, model, models } from "mongoose";
import Post from "../model/blog"

const CommentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    parentCommentId: {
  type: Schema.Types.ObjectId,
  ref: "Comment",
  default: null,
  index: true,
},

    name: {
      type: String,
      required: true,
      trim: true,
    },

    contact: {
      type: String,
      default: "",
      trim: true,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },

    // فیلدِ واقعیِ وضعیت — روتر (هم GET برای فیلتر، هم PATCH برای
    // تایید/رد) روی همین فیلد کار می‌کنه. قبلاً این فیلد اصلاً تو
    // اسکیما نبود، پس Mongoose (به‌خاطر strict mode پیش‌فرض) موقع
    // create/findByIdAndUpdate بی‌سروصدا حذفش می‌کرد — همون دلیلِ
    // خراب بودنِ فیلتر وضعیت و کار نکردنِ تایید/رد.
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // isApproved قبلاً هم بود؛ نگهش می‌داریم تا اگه جای دیگه‌ای
    // از پروژه (مثلاً نمایش عمومی نظرات روی خودِ پست) بهش وابسته
    // باشه چیزی نشکنه. منبعِ اصلیِ تصمیم از این به بعد approvalStatus‌ه.
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // خودش تاریخ ایجاد و ویرایش را ذخیره می‌کند
);

export default models.Comment || model("Comment", CommentSchema);