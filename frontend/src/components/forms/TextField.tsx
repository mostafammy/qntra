"use client";

import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string[];
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    const hasError = !!error && error.length > 0;
    const baseClasses =
      "mt-2 w-full rounded-2xl border bg-transparent px-4 py-3 text-base text-white transition border-white/10 focus:border-white/40 focus:outline-none focus:ring-0";
    const resolvedClasses = [
      baseClasses,
      hasError ? "border-red-500/60" : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#9aa5ce]">
          <span>{label}</span>
          <input ref={ref} className={resolvedClasses} {...props} />
        </label>
        {hasError && <p className="text-sm text-red-400">{error[0]}</p>}
      </div>
    );
  }
);

TextField.displayName = "TextField";
