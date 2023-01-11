import express from "express";
const router = express.Router();

import { getStats, getMonthlyStats } from "../controllers/statsController.js";

router.route("/").get(getStats);
router.route("/monthly").get(getMonthlyStats);

export default router;
