import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      required: true,
    },
    hearts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
