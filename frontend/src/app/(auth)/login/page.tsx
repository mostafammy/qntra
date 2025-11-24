import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in | Qyntra Studio",
  description: "Access the Qyntra creative commerce studio.",
};

export default function LoginPage() {
  return <LoginForm />;
}
