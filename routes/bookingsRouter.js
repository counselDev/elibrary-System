import express from "express";
const router = express.Router();

import {
  getSingleBookRequest,
  getAllBookRequest,
  getUserBookRequest,
  unRequestBook,
  requestBook,
  updateBookRequest,
} from "../controllers/bookingsController.js";

router.route("/").get(getAllBookRequest).post(requestBook);
router.route("/user").get(getUserBookRequest);
router
  .route("/:bookingId")
  .get(getSingleBookRequest)
  .delete(unRequestBook)
  .patch(updateBookRequest);

export default router;
