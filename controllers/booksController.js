import Book from "../models/Book.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../errors/index.js";
import Booking from "../models/Booking.js";
import Category from "../models/Category.js";

const createBook = async (req, res) => {
  const { role, userId } = req.user;

  if (role !== "admin") {
    throw new UnAuthorizedError("You cannot perform this action!");
  }

  const { title, author, publisher, yearPublished, category } = req.body;

  if (!title || !author || !publisher || !yearPublished || !category) {
    throw new BadRequestError("You must provide all Fields");
  }

  const foundBook = await Book.findOne({ title, author, publisher });

  if (foundBook) {
    throw new BadRequestError(" Book already exists");
  }

  let book = await Book.create(req.body);

  res
    .status(StatusCodes.CREATED)
    .json({ book, msg: "Book Created Successfully" });
};

const getAllBooks = async (req, res) => {
  const { status, sort, search } = req.query;
  const { userId } = req.user;
  let queryObject = {};

  // ADD BASED ON CONDITIONS
  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (search) {
    const stringSearchFields = ["title", "author", "publisher"];

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
  let result = Book.find(queryObject);

  // CHAIN CONNDITIONS
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("firstname");
  }
  if (sort === "z-a") {
    result = result.sort("-firstname");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  let books = await result;

  books = await Promise.all(
    books.map(async (book) => {
      const category = await Category.findOne({
        _id: book.category,
      });
      const bookRequested = await Booking.findOne({
        "user.userId": userId,
        "book.bookId": book._id,
      });

      return {
        ...book._doc,
        category,
        bookRequested,
      };
    })
  );

  const totalBooks = await Book.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalBooks / limit);

  res.status(StatusCodes.OK).json({
    books,
    totalBooks,
    numOfPages,
  });
};

const getSingleBook = async (req, res) => {
  const { id: bookId } = req.params;
  const { userId } = req.user;

  const singleBook = await Book.findOne({ _id: bookId });

  if (!singleBook) {
    throw new NotFoundError(`No book with Id: ${bookId}`);
  }

  const category = await Category.findOne({
    _id: singleBook.category,
  });

  const bookings = await Booking.find({
    "book.bookId": singleBook._id,
  }).sort("-createdAt");

  let numOfBookings = bookings.length;
  const bookRequested = await Booking.findOne({
    "user.userId": userId,
    "book.bookId": singleBook._id,
  });

  res.status(StatusCodes.OK).json({
    ...singleBook._doc,
    category,
    bookings,
    numOfBookings,
    bookRequested,
  });
};

const updateBook = async (req, res) => {
  const { id: bookId } = req.params;

  const book = await Book.findOne({ _id: bookId });

  if (!book) {
    throw new NotFoundError(`No book with Id: ${bookId}`);
  }

  await Book.findOneAndUpdate({ _id: bookId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ msg: "Success: Book Updated!" });
};

const deleteBook = async (req, res) => {
  const { id: bookId } = req.params;

  const book = await Book.findOne({ _id: bookId });

  if (!book) {
    throw new NotFoundError(`No book with Id: ${bookId}`);
  }

  await book.remove();
  res.status(StatusCodes.OK).json({ msg: "Success: Book Deleted" });
};

export { createBook, getAllBooks, updateBook, getSingleBook, deleteBook };
