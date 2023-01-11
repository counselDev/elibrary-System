import Category from "../models/Category.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../errors/index.js";
import Booking from "../models/Booking.js";


const createCategory = async (req, res) => {
  const { role, userId } = req.user;

  if (role !== "admin") {
    throw new UnAuthorizedError("You cannot perform this action!");
  }

  const { title } = req.body;

  if (!title ) {
    throw new BadRequestError("You must provide all Fields");
  }

  const foundCategory = await Category.findOne({ title });

  if (foundCategory) {
    throw new BadRequestError(" Category already exists");
  }

  let category = await Category.create(req.body);

  res
    .status(StatusCodes.CREATED)
    .json({ category, msg: "Category Created Successfully" });
};

const getAllCategories = async (req, res) => {
  const {  search ,sort } = req.query;
  let queryObject = {};

 
  if (search) {
    const stringSearchFields = ["title"];

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
  let result = Category.find(queryObject);

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

  let categories = await result;

  const totalCategories = await Category.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalCategories / limit);

  res.status(StatusCodes.OK).json({
    categories,
    totalCategories,
    numOfPages,
  });
};




const updateCategory = async (req, res) => {
  const { id: categoryId } = req.params;

  const category = await Category.findOne({ _id: categoryId });

  if (!category) {
    throw new NotFoundError(`No category with Id: ${categoryId}`);
  }

  await Category.findOneAndUpdate({ _id: categoryId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ msg: "Success: Category Updated!" });
};

const deleteCategory = async (req, res) => {
  const { id: categoryId } = req.params;

  const category = await Category.findOne({ _id: categoryId });

  if (!category) {
    throw new NotFoundError(`No category with Id: ${categoryId}`);
  }

  await category.remove();
  res.status(StatusCodes.OK).json({ msg: "Success: Category Deleted" });
};

export {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
