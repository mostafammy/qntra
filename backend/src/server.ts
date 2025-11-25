import bcrypt from "bcryptjs";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = 4000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow your Frontend to talk to this
app.use(express.json());

// 1. CREDENTIALS LOGIN (Used by your LoginForm)
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare hashed password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Return the user (NextAuth will put this in the session)
    // NEVER return the password field
    const { password: _, ...userSafe } = user;
    res.json({ user: userSafe });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 2. SIGN UP (Used by your SignupForm)
app.post("/auth/signup", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    const { password: _, ...userSafe } = user;
    res.json({ user: userSafe });
  } catch (error) {
    res.status(500).json({ message: "Error creating account" });
  }
});

// 3. SOCIAL SYNC (Crucial for Google/GitHub/Discord)
// NextAuth calls this to ensure the social user exists in your DB
app.post("/auth/social-sync", async (req, res) => {
  const { email, name, image, provider } = req.body;

  try {
    // "Upsert": Update if exists, Create if not
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        image,
        // We can create an Account record here if we want strictly separated tables
      },
      create: {
        email,
        name,
        image,
        password: null, // No password for social users
      },
    });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sync failed" });
  }
});

// ✅ THE API ENDPOINT (Express Style)
app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });

    // Express uses res.json(), not NextResponse
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
});
