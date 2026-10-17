"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function Command({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-[#0d0d0e] text-white",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CommandInput({
  className,
  value,
  onValueChange,
  placeholder,
  ...props
}: {
  className?: string;
  value?: string;
  onValueChange?: (val: string) => void;
  placeholder?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <div className="flex items-center border-b border-white/10 px-3">
      <Search className="mr-2 h-4 w-4 shrink-0 text-white/50" />
      <input
        className={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-white/40 text-white disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export function CommandList({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden p-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CommandEmpty({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("py-6 text-center text-sm text-white/50", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CommandGroup({
  className,
  heading,
  children,
  ...props
}: {
  heading?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("overflow-hidden p-1 text-white/70", className)}
      {...props}
    >
      {heading && (
        <div className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/40">
          {heading}
        </div>
      )}
      {children}
    </div>
  );
}

export function CommandItem({
  className,
  onSelect,
  children,
  ...props
}: {
  onSelect?: () => void;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-white/10 hover:text-white aria-selected:bg-white/10 aria-selected:text-white",
        className
      )}
      onClick={onSelect}
      {...props}
    >
      {children}
    </div>
  );
}
