import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide A Book title"],
      minlength: 2,
      trim: true,
    },
    coverImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    author: {
      type: String,
      required: [true, "Please provide author"],
      minlength: 2,
      trim: true,
    },
    publisher: {
      type: String,
      required: [true, "Please provide publisher"],
    },
    yearPublished: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["avialable", "notAvialable"],
      default: "avialable",
    },

    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    copies: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", BookSchema);
