import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";
import Booking from "../models/Booking.js";

const getAllUsers = async (req, res) => {
  const { sort, search } = req.query;
  let queryObject = {};

  // ADD BASED ON CONDITIONS

  if (search) {
    const stringSearchFields = ["firstname", "lastname", "email", "phone"];

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
  let result = User.find(queryObject);

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

  let users = await result;

  users = await Promise.all(
    users.map(async (user) => {
      const userBookRequest = await Booking.find({
        "passengers.passengerId": user._id,
      });

      const numOfBookings = userBookRequest.length;

      return {
        ...user._doc,
        numOfBookings,
      };
    })
  );

  const totalUsers = await User.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalUsers / limit);

  res.status(StatusCodes.OK).json({
    users,
    totalUsers,
    numOfPages,
  });
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError(`No user with Id: ${userId}`);
  }

  await user.remove();
  res.status(StatusCodes.OK).json({ msg: "Success: User Deleted" });
};

export { getAllUsers, deleteUser };
