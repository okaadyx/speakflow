import React from "react";
import { cn } from "../../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "info" | "outline";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default:
        "bg-surface-secondary text-text-secondary border border-border-subtle",
      success:
        "bg-success/10 text-success border border-success/20",
      warning:
        "bg-warning/10 text-warning border border-warning/20",
      info:
        "bg-accent/10 text-accent border border-accent/20",
      outline:
        "bg-transparent text-text-secondary border border-border-subtle",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
