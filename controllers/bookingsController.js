import Booking from "../models/Booking.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import Book from "../models/Book.js";
import User from "../models/User.js";

const requestBook = async (req, res) => {
  const { bookId, startTime, endTime } = req.body;

  if (!bookId || !startTime || !endTime) {
    throw new BadRequestError("Please provide all Fields");
  }

  const alreadyBooked = await Booking.findOne({
    $or: [{ status: "request" }, { status: "issued" }],
    "user.userId": req.user.userId,
    "book.bookId": bookId,
  });

  let day = new Date();
  const start = day.setUTCHours(0, 0, 0, 0);
  const end = day.setUTCHours(23, 59, 59, 999);

  const reachedRequestLimit = await Booking.find({
    createdAt: { $gte: start, $lte: end },
    "user.userId": req.user.userId,
  });

  if (alreadyBooked) {
    throw new BadRequestError("This book has been issued you already");
  }
  if (reachedRequestLimit.length > 50) {
    throw new BadRequestError("You already more than 50 bookings today");
  }

  const bookInfo = await Book.findById(bookId);
  const userInfo = await User.findById(req.user.userId);

  if (!bookInfo) {
    throw new BadRequestError("No Book with Id");
  }

  const book = {
    title: bookInfo.title,
    author: bookInfo.author,
    bookId: bookInfo._id,
  };
  const user = {
    fullname: ` ${userInfo.firstname} ${userInfo.lastname}`,
    userId: userInfo._id,
  };

  let booking = await Booking.create({ ...req.body, book, user });

  res.status(StatusCodes.CREATED).json(booking);
};

const getSingleBookRequest = async (req, res) => {
  const { bookingId } = req.params;

  let singleBookRequest = await Booking.findOne({ _id: bookingId });

  const book = await Book.findById(singleBookRequest.book.bookId);
  const user = await User.findById(singleBookRequest.user.userId);

  let updatedBooking;
  if (
    singleBookRequest.status === "issued" &&
    singleBookRequest.endTime < new Date()
  ) {
    updatedBooking = await Booking.findOneAndUpdate(
      { _id: singleBookRequest._id },
      { status: "due" },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  res.status(StatusCodes.OK).json({
    ...singleBookRequest._doc,
    book,
    user,
    status: updatedBooking?.status || singleBookRequest.status,
  });
};

const getAllBookRequest = async (req, res) => {
  const { status, sort, search } = req.query;
  let queryObject = {};

  if (search) {
    const stringSearchFields = ["book.title"];

    const query = {
      $or: [
        ...stringSearchFields.map((field) => ({
          [field]: new RegExp("^" + search, "i"),
        })),
      ],
    };
    queryObject = { ...queryObject, ...query };
  }

  // No AWAIT
  let result = Booking.find(queryObject);

  // CHAIN CONNDITIONS
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("book.fullname");
  }
  if (sort === "z-a") {
    result = result.sort("-book.fullname");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  let bookings = await result;

  bookings = await Promise.all(
    bookings.map(async (booking) => {
      const book = await Book.findById(booking.book.bookId);
      let updatedBooking;

      if (booking.status === "issued" && booking.endTime < new Date()) {
        updatedBooking = await Booking.findOneAndUpdate(
          { _id: booking._id },
          { status: "due" },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      return {
        ...booking._doc,
        book,
        status: updatedBooking?.status || booking.status,
      };
    })
  );

  const totalBookings = await Booking.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalBookings / limit);

  res.status(StatusCodes.OK).json({
    bookings,
    totalBookings,
    numOfPages,
  });
};

const getUserBookRequest = async (req, res) => {
  const { userId, role } = req.user;
  const { search, status, id } = req.query;

  let bookRequest;
  let queryObject;

  if (role === "reader") {
    queryObject = {
      "user.userId": userId,
    };
  } else if (role === "admin") {
    queryObject = {
      "user.userId": id,
    };
  }

  // ADD BASED ON CONDITIONS
  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (search) {
    const stringSearchFields = ["book.title"];

    const query = {
      $or: [
        ...stringSearchFields.map((field) => ({
          [field]: new RegExp("^" + search, "i"),
        })),
      ],
    };
    queryObject = { ...queryObject, ...query };
  }

  bookRequest = await Booking.find(queryObject).sort("-createdAt");
  const issuedBookRequest = await Booking.find({
    ...queryObject,
    status: "issued",
  }).sort("-createdAt");

  bookRequest = await Promise.all(
    bookRequest.map(async (booking) => {
      const book = await Book.findById(booking.book.bookId);

      let updatedBooking;

      if (booking.status === "issued" && booking.endTime < new Date()) {
        updatedBooking = await Booking.findOneAndUpdate(
          { _id: booking._id },
          { status: "due" },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      return {
        ...booking._doc,
        book,
        status: updatedBooking?.status || booking.status,
      };
    })
  );

  res.status(StatusCodes.OK).json({ bookRequest, issuedBookRequest });
};

const unRequestBook = async (req, res) => {
  const { bookingId } = req.params;

  if (!bookingId) {
    throw new BadRequestError("Please Provide Booking ID");
  }
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new BadRequestError("No Booking with specified ID");
  }

  if (booking.status == "request") {
    let updatedBooking = await Booking.findOneAndDelete({ _id: bookingId });

    res
      .status(StatusCodes.CREATED)
      .json({ updatedBooking, msg: "Booking Updated Successfully" });
  } else {
    throw new BadRequestError("Cannot Unbook an Issued Book");
  }
};

const updateBookRequest = async (req, res) => {
  const { bookingId } = req.params;

  if (!bookingId) {
    throw new BadRequestError("Please Provide Booking ID");
  }
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new BadRequestError("No Booking with specified ID");
  }

  let updatedBooking = await Booking.findOneAndUpdate(
    { _id: bookingId },
    req.body
  );

  res
    .status(StatusCodes.CREATED)
    .json({ updatedBooking, msg: "Booking Updated Successfully" })
};

export {
  getSingleBookRequest,
  getAllBookRequest,
  getUserBookRequest,
  unRequestBook,
  requestBook,
  updateBookRequest,
};
