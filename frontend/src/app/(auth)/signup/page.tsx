import type { Metadata } from "next";

import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create account | Qyntra Studio",
  description: "Join Qyntra Studio and build immersive commerce journeys.",
};

export default function SignupPage() {
  return <SignupForm />;
}
