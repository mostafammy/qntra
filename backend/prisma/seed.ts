import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Seeding Process...");

  // 1. CREATE CATEGORIES
  // We use "upsert" to avoid errors if you run this script twice.
  const electronics = await prisma.category.upsert({
    where: { id: "cat_electronics" }, // Hardcoded ID for consistency
    update: {},
    create: {
      id: "cat_electronics",
      name: "Electronics",
    },
  });

  const fashion = await prisma.category.upsert({
    where: { id: "cat_fashion" },
    update: {},
    create: {
      id: "cat_fashion",
      name: "Fashion",
    },
  });

  console.log("✅ Categories Created");

  // 2. CREATE PRODUCTS
  // Note: We use "Decimal" strings because JavaScript Numbers lose precision
  const products = [
    {
      id: "prod_macbook",
      name: 'MacBook Pro 14"',
      slug: "macbook-pro-14",
      description: "The ultimate pro laptop with M3 chip.",
      price: 1999.99,
      stock: 50,
      categoryId: electronics.id,
      images: ["https://placehold.co/600x400/png?text=MacBook+Pro"],
      isFeatured: true,
    },
    {
      id: "prod_iphone",
      name: "iPhone 15 Pro",
      slug: "iphone-15-pro",
      description: "Titanium design. A17 Pro chip.",
      price: 999.0,
      stock: 100,
      categoryId: electronics.id,
      images: ["https://placehold.co/600x400/png?text=iPhone+15"],
      isFeatured: true,
    },
    {
      id: "prod_sneaker",
      name: "Minimalist Leather Sneaker",
      slug: "minimalist-leather-sneaker",
      description: "Handcrafted Italian leather sneakers.",
      price: 145.5,
      stock: 20,
      categoryId: fashion.id,
      images: ["https://placehold.co/600x400/png?text=Sneaker"],
      isFeatured: false,
    },
    {
      id: "prod_tshirt",
      name: "Cotton Basic T-Shirt",
      slug: "cotton-basic-t-shirt",
      description: "100% Organic Cotton. Breathable fit.",
      price: 25.0,
      stock: 200,
      categoryId: fashion.id,
      images: ["https://placehold.co/600x400/png?text=T-Shirt"],
      isFeatured: false,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {}, // If exists, do nothing
      create: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        stock: product.stock,
        images: product.images,
        isFeatured: product.isFeatured,
        categoryId: product.categoryId,
      },
    });
  }

  console.log(`✅ Seeded ${products.length} Products`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
