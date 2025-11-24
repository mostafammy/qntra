"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

import { loginAction } from "@/app/(auth)/actions";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { TextField } from "@/components/forms/TextField";
import { SocialProviders } from "@/components/auth/SocialProviders";
import { initialFormState } from "@/types/forms";

export function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initialFormState);

  return (
    <div className="glass-card w-full max-w-md p-6">
      <div className="mb-6 space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-[#9aa5ce]">
          Welcome back
        </p>
        <h1 className="text-2xl font-semibold text-white">
          Sign in to Qyntra Studio
        </h1>
        <p className="text-sm text-[#9aa5ce]">
          Continue crafting immersive commerce experiences.
        </p>
      </div>

      {state.status === "error" && state.message && (
        <div className="mb-5 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <TextField
          label="Email"
          name="email"
          type="email"
          placeholder="you@studio.app"
          autoComplete="email"
          error={state.fieldErrors?.email}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          error={state.fieldErrors?.password}
          required
        />
        <SubmitButton label="Sign in" pendingLabel="Signing in" />
      </form>

      <div className="my-6 text-center text-sm text-[#9aa5ce]">
        or choose another secure method
      </div>

      <SocialProviders />

      <p className="mt-6 text-center text-sm text-[#9aa5ce]">
        New here?{" "}
        <Link
          className="text-white underline-offset-4 hover:underline"
          href="/signup"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
