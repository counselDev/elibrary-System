import User from "../models/User.js";
import { UnAuthorizedError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import moment from "moment/moment.js";
import Book from "../models/Book.js";
import Booking from "../models/Booking.js";
import Category from "../models/Category.js";

const getStats = async (req, res) => {
  if (req.user.role !== "admin") {
    throw new UnAuthorizedError(
      "You are not permitted to access this resource"
    );
  }

  const numOfBook = await Book.countDocuments({ role: { $ne: "admin" } });
  const numOfUsers = await User.countDocuments();
  const numOfBookings = await Booking.countDocuments();
  const numOfCategories = await Category.countDocuments();
  let numDueBookings = await Booking.find({ status: "due" });
 
  numDueBookings = await Promise.all(
    numDueBookings.map(async (booking) => {
      const book = await Book.findById(booking.book.bookId);

      return {
        ...booking._doc,
        book,
      };
    })
  );

  res.status(StatusCodes.OK).json([
    {
      title: "Book",
      total: numOfBook,
    },
    {
      title: "User",
      total: numOfUsers,
    },
    {
      title: "Book Request",
      total: numOfBookings,
    },
    {
      title: "Category",
      total: numOfCategories,
    },
    {
      title: "Due Book Request",
      total: numDueBookings.length,
      bookings: numDueBookings,
    },
  ]);
};

const getMonthlyStats = async (req, res) => {
  let monthlyApplications = await Booking.aggregate([
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json(monthlyApplications);
};

export { getStats, getMonthlyStats };
