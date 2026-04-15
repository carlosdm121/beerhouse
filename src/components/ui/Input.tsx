'use client';

import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Optional className for styling */
  className?: string;
  /** Label text for the input */
  label?: string;
  /** Whether the input is required */
  required?: boolean;
}

export function Input({
  className,
  label,
  required,
  id: idProp,
  ...props
}: InputProps) {
  const reactId = useId();
  const id = idProp ?? reactId;

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "block text-sm font-medium text-gray-700 dark:text-gray-200",
            required && "text-red-500"
          )}
        >
          {label}{required && "*"}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:focus-visible:outline-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}