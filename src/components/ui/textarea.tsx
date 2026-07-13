import React from "react";
import { cn } from "../../utils/cn";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex w-full px-4 py-3 text-sm rounded-xl border transition-all duration-200 bg-white/20 dark:bg-zinc-900/20 border-border-subtle text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/45 focus:bg-white/50 dark:focus:bg-zinc-900/45 resize-y",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
