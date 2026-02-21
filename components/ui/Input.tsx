"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  help?: string;
  confidential?: boolean;
  showToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, help, confidential, showToggle, type = "text", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password" || showToggle;
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="mb-4">
        {label && (
          <label className="block mb-1.5 text-sm font-medium text-text-main">
            {label}
            {confidential && (
              <span className="ml-2 px-1.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide bg-danger/15 text-danger border border-danger/30 rounded">
                Confidential
              </span>
            )}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full px-3 py-2.5 rounded-md bg-gray-50 text-text-main text-sm",
              "border-2 outline-none transition-all duration-150",
              confidential
                ? "border-danger/40 focus:border-danger focus:bg-white"
                : "border-gray-200 focus:border-accent focus:bg-white",
              "placeholder:text-text-soft",
              isPassword && "pr-10",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 p-1 text-text-soft hover:text-text-main transition-all hover:scale-110 active:scale-95 rounded"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          )}
        </div>
        {help && (
          <p className="mt-1 text-xs text-text-muted">{help}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
