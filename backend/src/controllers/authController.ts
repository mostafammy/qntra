import type { Request, Response } from "express";
import { z } from "zod";
import { userStore } from "../utils/userStore.js";

const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signup = async (req: Request, res: Response) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return res.status(400).json({ message: "Invalid input", errors });
  }

  const { name, email, password } = parsed.data;

  try {
    const user = await userStore.createUser(name, email, password);
    return res.status(201).json({ user });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Signup failed";
    return res.status(400).json({ message });
  }
};

export const login = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return res.status(400).json({ message: "Invalid input", errors });
  }

  const { email, password } = parsed.data;

  const user = await userStore.verifyUser(email, password);
  if (!user) {
    return res.status(401).json({ message: "Incorrect email or password" });
  }

  return res.json({ user });
};
