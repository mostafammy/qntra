import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      categoryId,
      images,
      isFeatured,
      isArchived,
    } = req.body;

    // Basic validation (Zod should be used here too ideally, but for now manual check)
    if (!name || !price) {
      return res.status(400).json({ error: "Name and Price are required" });
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const product = await prisma.product.create({
      data: {
        name,
        slug: `${slug}-${Date.now()}`, // Ensure uniqueness
        description,
        price,
        stock: Number(stock) || 0,
        categoryId,
        images: images || [], // Array of URLs
        isFeatured: isFeatured || false,
        isArchived: isArchived || false,
      },
    });

    res.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};
