import { z } from "zod";

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
  NEXTAUTH_URL: z.string().url().optional(),
  AUTH_GITHUB_CLIENT_ID: z.string().min(1, "AUTH_GITHUB_CLIENT_ID is required"),
  AUTH_GITHUB_CLIENT_SECRET: z
    .string()
    .min(1, "AUTH_GITHUB_CLIENT_SECRET is required"),
  AUTH_GOOGLE_CLIENT_ID: z.string().min(1, "AUTH_GOOGLE_CLIENT_ID is required"),
  AUTH_GOOGLE_CLIENT_SECRET: z
    .string()
    .min(1, "AUTH_GOOGLE_CLIENT_SECRET is required"),
  AUTH_DISCORD_CLIENT_ID: z
    .string()
    .min(1, "AUTH_DISCORD_CLIENT_ID is required"),
  AUTH_DISCORD_CLIENT_SECRET: z
    .string()
    .min(1, "AUTH_DISCORD_CLIENT_SECRET is required"),
  AUTH_BACKEND_URL: z.string().url("AUTH_BACKEND_URL must be a valid URL"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const formatted = parsed.error.format();
  const issues = Object.entries(formatted)
    .filter(([key]) => key !== "_")
    .map(
      ([key, value]) =>
        `${key}: ${(value as { _errors: string[] })._errors.join(", ")}`
    )
    .join("; ");

  throw new Error(
    `Invalid environment configuration for authentication: ${issues}`
  );
}

export const env = Object.freeze(parsed.data);

type Env = typeof env;

export type RequiredAuthEnv = Env;
