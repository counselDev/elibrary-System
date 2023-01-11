import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: {
      fullname: "String",
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
    book: {
      title: String,
      author: String,
      bookId: {
        type: mongoose.Types.ObjectId,
        ref: "Book",
      },
    },

    startTime: {
      type: Date,
      required: [true, "Please provide a Start Time"],
    },
    endTime: {
      type: String,
      required: [true, "Please provide a End Time"],
    },
    status: {
      type: String,
      enum: ["request", "issued", "due", "returned"],
      default: "request",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
