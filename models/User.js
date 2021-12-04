import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
