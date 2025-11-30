import express from "express";
import {
  getDashboardStats,
  getRecentActivity,
  getAnalyticsData,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/stats", getDashboardStats);
router.get("/activity", getRecentActivity);
router.get("/analytics", getAnalyticsData);

export default router;
