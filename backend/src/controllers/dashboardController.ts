import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  DashboardStatsDTO,
  RecentActivityItemDTO,
} from "../types/dashboard.js";

const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // 1. Calculate Total Revenue (Sum of paid orders)
    const revenueResult = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        isPaid: true,
      },
    });
    const revenue = revenueResult._sum.total
      ? Number(revenueResult._sum.total)
      : 0;

    // 2. Count Active Orders (Pending or Paid but not Delivered/Cancelled)
    const activeOrders = await prisma.order.count({
      where: {
        status: {
          in: ["PENDING", "PAID", "SHIPPED"],
        },
      },
    });

    // 3. Count Low Stock Products (e.g., less than 10 items)
    const lowStock = await prisma.product.count({
      where: {
        stock: {
          lt: 10,
        },
      },
    });

    const stats: DashboardStatsDTO = {
      revenue,
      activeOrders,
      lowStock,
    };

    res.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRecentActivity = async (req: Request, res: Response) => {
  try {
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    const activity: RecentActivityItemDTO[] = recentOrders.map((order) => ({
      id: order.id,
      user: {
        name: order.user.name,
        email: order.user.email,
        image: order.user.image,
      },
      total: Number(order.total),
      status: order.status,
      createdAt: order.createdAt.toISOString(),
    }));

    res.json(activity);
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAnalyticsData = async (req: Request, res: Response) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
        isPaid: true,
      },
      select: {
        createdAt: true,
        total: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Group by date
    const groupedData: Record<string, number> = {};

    orders.forEach((order) => {
      const date = order.createdAt.toISOString().split("T")[0];
      const amount = Number(order.total);
      // Fix for noUncheckedIndexedAccess
      const currentTotal = groupedData[date] ?? 0;
      groupedData[date] = currentTotal + amount;
    });

    // Convert to array
    const chartData = Object.keys(groupedData).map((date) => ({
      date,
      revenue: groupedData[date],
    }));

    res.json(chartData);
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
