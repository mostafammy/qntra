"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  label: string;
  pendingLabel?: string;
}

export function SubmitButton({
  label,
  pendingLabel = "Please wait",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full rounded-2xl bg-linear-to-r from-[#00e0ff] to-[#7209b7] px-4 py-3 font-semibold text-[#03030a] shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      disabled={pending}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
