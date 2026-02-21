"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  loading?: boolean;
  success?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", loading, success, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center px-6 py-2.5 rounded-md text-sm font-semibold cursor-pointer transition-all duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-accent text-white shadow-btn-primary hover:bg-accent-strong hover:shadow-btn-primary-hover hover:-translate-y-0.5 active:translate-y-0",
      secondary: cn(
        "bg-white text-text-main border-2 border-gray-300",
        "hover:border-accent hover:text-accent hover:-translate-y-0.5",
        "active:translate-y-0 active:bg-gray-50",
        success && "border-success text-success bg-success/10"
      ),
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          loading && "opacity-70 pointer-events-none",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {children}
        {loading && (
          <span className="ml-2 w-3.5 h-3.5 border-2 border-transparent border-t-current rounded-full animate-spin" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
