import React from "react";
import { cn } from "../../utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex w-full px-4 py-2.5 text-sm rounded-xl border transition-all duration-200 bg-white/20 dark:bg-zinc-900/20 border-border-subtle text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/45 focus:bg-white/50 dark:focus:bg-zinc-900/45",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
