"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "mini" | "hero";
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hoverable = true, children, ...props }, ref) => {
    const variants = {
      default: "bg-white rounded-lg p-5 border border-gray-200 shadow-card",
      mini: "bg-white rounded-md p-4 border border-gray-200 text-sm text-text-soft shadow-subtle",
      hero: "bg-white rounded-xl border border-gray-200 shadow-soft overflow-hidden",
    };

    const hoverStyles = hoverable
      ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-accent/40"
      : "";

    return (
      <div
        ref={ref}
        className={cn(variants[variant], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
