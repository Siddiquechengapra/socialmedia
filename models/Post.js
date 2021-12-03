import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    body: String,
    username: String,
    comments: [
      {
        body: String,
        username: String,
      },
    ],
    likes: [
      {
        username: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", postSchema);
