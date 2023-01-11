import express from "express";
const router = express.Router();

import {
  getAllUsers,
  deleteUser,
} from "../controllers/usersController.js";

router.route("/").get(getAllUsers);
router.route("/:id").delete(deleteUser);

export default router;
