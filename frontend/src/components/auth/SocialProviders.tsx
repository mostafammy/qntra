"use client";

import { useTransition } from "react";
import type { ReactElement } from "react";
import { signIn } from "next-auth/react";

const PROVIDERS = [
  { id: "google", label: "Continue with Google" },
  { id: "github", label: "Continue with GitHub" },
  { id: "discord", label: "Continue with Discord" },
] as const;

type ProviderId = (typeof PROVIDERS)[number]["id"];

const ICONS: Record<ProviderId, ReactElement> = {
  google: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
      <path
        fill="#EA4335"
        d="M12 10.8v3.84h5.44c-.24 1.28-1.6 3.76-5.44 3.76-3.28 0-5.96-2.72-5.96-6.08s2.68-6.08 5.96-6.08c1.88 0 3.14.8 3.86 1.48l2.62-2.52C17.38 3.84 14.9 2.8 12 2.8 6.92 2.8 2.8 6.92 2.8 12s4.12 9.2 9.2 9.2c5.3 0 8.82 3.72 8.82-5.04 0-.66-.06-1.08-.14-1.56H12Z"
      />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-white">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.29-1.7-1.29-1.7-1.06-.73.08-.72.08-.72 1.18.08 1.8 1.22 1.8 1.22 1.04 1.78 2.72 1.27 3.39.97.1-.76.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.2-3.1-.12-.29-.52-1.46.12-3.04 0 0 .98-.31 3.21 1.19a11.04 11.04 0 0 1 5.84 0c2.23-1.5 3.21-1.19 3.21-1.19.64 1.58.24 2.75.12 3.04.75.8 1.2 1.84 1.2 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.07.8 2.16 0 1.56-.02 2.82-.02 3.2 0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  ),
  discord: (
    <svg viewBox="0 0 71 55" aria-hidden className="h-5 w-5 fill-[#5865F2]">
      <path d="M60.1 4.5A58.3 58.3 0 0 0 46.2.5c-.6 1.2-1.2 2.5-1.7 3.8-5-1-10.2-1-15.2 0-.5-1.3-1.1-2.6-1.7-3.8A58.6 58.6 0 0 0 13.9 4.6C2.2 21.1 0 37 0 52.7c7 5.1 14 8.2 20.7 10.3a44 44 0 0 0 3.6-5.8 37 37 0 0 1-5.7-2.8c.5-.4 1-.9 1.5-1.4 10.8 5 22.5 5 33.3 0 .5.5 1 1 1.5 1.4a37 37 0 0 1-5.7 2.8 44 44 0 0 0 3.6 5.8c6.7-2.1 13.7-5.2 20.7-10.3 0-15.7-2.2-31.6-13.4-48.2ZM23.7 37.8c-3 0-5.4-2.8-5.4-6.1 0-3.3 2.4-6.1 5.4-6.1 3 0 5.5 2.8 5.4 6.1 0 3.3-2.4 6.1-5.4 6.1Zm23.6 0c-3 0-5.4-2.8-5.4-6.1 0-3.3 2.4-6.1 5.4-6.1 3 0 5.4 2.8 5.4 6.1 0 3.3-2.4 6.1-5.4 6.1Z" />
    </svg>
  ),
};

export function SocialProviders() {
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-3">
      {PROVIDERS.map((provider) => (
        <button
          key={provider.id}
          type="button"
          onClick={() =>
            startTransition(async () => {
              await signIn(provider.id, { callbackUrl: "/app" });
            })
          }
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-white transition hover:border-white/40"
          disabled={pending}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
            {ICONS[provider.id]}
          </span>
          <span className="grow text-left">
            {pending ? "Connecting…" : provider.label}
          </span>
        </button>
      ))}
    </div>
  );
}
