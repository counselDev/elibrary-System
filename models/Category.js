import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide A Category title"],
      minlength: 2,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
