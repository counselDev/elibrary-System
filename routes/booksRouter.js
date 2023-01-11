import express from "express";
const router = express.Router();

import {
  createBook,
  getAllBooks,
  updateBook,
  getSingleBook,
  deleteBook
} from "../controllers/booksController.js";

router.route("/").post(createBook).get(getAllBooks);
router.route("/:id").get(getSingleBook).patch(updateBook).delete(deleteBook);
export default router;
