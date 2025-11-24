"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { signIn } from "@/auth";
import { env } from "@/lib/env";
import type { FormState } from "@/types/forms";

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
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
  } catch (error) {
    return handleAuthError(error);
  }

  redirect("/app");
}

export async function signupAction(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${env.AUTH_BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsed.data),
    cache: "no-store",
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    return {
      status: "error",
      message: payload?.message ?? "Signup failed",
      fieldErrors: payload?.errors ?? undefined,
    };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
  } catch (error) {
    return handleAuthError(error);
  }

  redirect("/app");
}
