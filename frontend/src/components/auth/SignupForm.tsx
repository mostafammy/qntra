"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signupAction } from "@/app/(auth)/actions";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { TextField } from "@/components/forms/TextField";
import { SocialProviders } from "@/components/auth/SocialProviders";
import { initialFormState } from "@/types/forms";

export function SignupForm() {
  const [state, formAction] = useActionState(signupAction, initialFormState);

  return (
    <div className="glass-card w-full max-w-md p-6">
      <div className="mb-6 space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-[#9aa5ce]">
          Join the collective
        </p>
        <h1 className="text-2xl font-semibold text-white">
          Create your studio profile
        </h1>
        <p className="text-sm text-[#9aa5ce]">
          Collaborate with teams and launch experimental drops faster.
        </p>
      </div>

      {state.status === "error" && state.message && (
        <div className="mb-5 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <TextField
          label="Full name"
          name="name"
          placeholder="Nova Quinn"
          autoComplete="name"
          error={state.fieldErrors?.name}
          required
        />
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
          placeholder="Min. 8 characters"
          autoComplete="new-password"
          error={state.fieldErrors?.password}
          required
        />
        <SubmitButton label="Create account" pendingLabel="Creating" />
      </form>

      <div className="my-6 text-center text-sm text-[#9aa5ce]">
        Prefer social sign-in?
      </div>

      <SocialProviders />

      <p className="mt-6 text-center text-sm text-[#9aa5ce]">
        Already onboard?{" "}
        <Link
          className="text-white underline-offset-4 hover:underline"
          href="/login"
        >
          Access your studio
        </Link>
      </p>
    </div>
  );
}
