import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  let user = null;
  let token = null;

  const { firstname, lastname, gender, phone, email, password } = req.body;

  if (!firstname || !lastname || !gender || !phone || !email || !password) {
    throw new BadRequestError("Please provide all fields");
  }

  const userAlreadyExist = await User.findOne({ email });

  if (userAlreadyExist) {
    throw new BadRequestError("Email Already in use");
  }

  user = await User.create(req.body);
  token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  let user = null;
  let token = null;

  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please Provide all Values");
  }

  user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnAuthenticatedError("Email not registered");
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid password");
  }
  token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

export { register, login };
