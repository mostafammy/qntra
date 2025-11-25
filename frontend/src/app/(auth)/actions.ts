"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { signIn } from "@/auth";
import { env } from "@/lib/env";
import type { FormState } from "@/types/forms";
import { AuthError } from "next-auth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Name is required"),
});

const handleAuthError = (error: unknown): FormState => {
  if (error && typeof error === "object") {
    const maybeAuthError = error as { type?: string; message?: string } & Error;
    if (maybeAuthError.type === "CredentialsSignin") {
      return {
        status: "error",
        message: "Invalid email or password",
      };
    }

    if (maybeAuthError.message) {
      return { status: "error", message: maybeAuthError.message };
    }
  }

  const message =
    error instanceof Error ? error.message : "Authentication failed";
  return { status: "error", message };
};

export async function loginAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // This calls the "authorize" function in your config.ts
    await signIn("credentials", {
      email,
      password,
      redirect: false, // We handle redirect manually to catch errors
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            status: "error",
            message: "Invalid email or password.",
          };
        default:
          return {
            status: "error",
            message: "Something went wrong.",
          };
      }
    }
    throw error; // Rethrow redirect errors (Next.js quirk)
  }

  // If successful:
  redirect("/app"); // Or wherever you want them to go
}

export async function signupAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Call Backend to Create User
  const res = await fetch(`${process.env.AUTH_BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const json = await res.json();

  if (!res.ok) {
    return {
      status: "error",
      message: json.message || "Signup failed",
    };
  }

  // 2. If successful, Auto-Login the user
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    // If login fails after signup, redirect to login page
    redirect("/login?signup=success");
  }

  redirect("/app");
}
