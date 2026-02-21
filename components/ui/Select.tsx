"use client";

import { cn } from "@/lib/utils";
import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  help?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, help, options, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="block mb-1.5 text-sm font-medium text-text-main">{label}</label>
        )}
        <select
          ref={ref}
          className={cn(
            "w-full px-3 py-2.5 rounded-md bg-gray-50 text-text-main text-sm cursor-pointer",
            "border-2 border-gray-200 outline-none transition-all duration-150",
            "focus:border-accent focus:bg-white",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {help && <p className="mt-1 text-xs text-text-muted">{help}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
