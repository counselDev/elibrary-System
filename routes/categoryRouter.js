import express from "express";
const router = express.Router();

import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

router.route("/").post(createCategory).get(getAllCategories);
router.route("/:id").patch(updateCategory).delete(deleteCategory);
export default router;
