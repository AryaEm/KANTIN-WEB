import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-white/80">
            {label}
          </label>
        )}

        <input
          type={type}
          ref={ref}
          className={cn(
            "h-10 w-full rounded-md border bg-transparent px-3 text-sm text-white",
            "border-white/30 placeholder:text-white/40",
            "focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />

        {error && (
          <span className="text-xs text-red-400">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
