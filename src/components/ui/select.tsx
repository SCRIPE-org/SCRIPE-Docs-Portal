"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";

interface SelectContextType {
  value?: string;
  onValueChange?: (val: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedLabel?: React.ReactNode;
  setSelectedLabel: (label: React.ReactNode) => void;
}

const SelectContext = React.createContext<SelectContextType | null>(null);

export function Select({
  value,
  onValueChange,
  children,
  defaultValue,
}: {
  value?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
  defaultValue?: string;
}) {
  const [internalVal, setInternalVal] = React.useState(defaultValue || "");
  const [open, setOpen] = React.useState(false);
  const [selectedLabel, setSelectedLabel] =
    React.useState<React.ReactNode>(null);

  const currentVal = value !== undefined ? value : internalVal;
  const handleValChange = (newVal: string) => {
    if (value === undefined) setInternalVal(newVal);
    onValueChange?.(newVal);
    setOpen(false);
  };

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
      return () =>
        document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [open]);

  return (
    <SelectContext.Provider
      value={{
        value: currentVal,
        onValueChange: handleValChange,
        open,
        setOpen,
        selectedLabel,
        setSelectedLabel,
      }}
    >
      <div ref={containerRef} className="relative inline-block w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, id, ...props }, ref) => {
  const ctx = React.useContext(SelectContext);
  return (
    <button
      type="button"
      id={id}
      ref={ref}
      onClick={() => ctx?.setOpen(!ctx?.open)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-nx-control border border-nx-line bg-nx-ground px-3 py-2 text-sm text-nx-ink ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-nx-accent disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const ctx = React.useContext(SelectContext);
  return (
    <span className="block truncate text-start">
      {ctx?.selectedLabel || ctx?.value || placeholder || "Select option"}
    </span>
  );
}

export function SelectContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(SelectContext);
  if (!ctx?.open) return null;

  return (
    <div
      className={cn(
        "absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-nx-control border border-nx-line bg-nx-surface p-1 text-nx-ink shadow-nx-lg animate-in fade-in-80",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SelectItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(SelectContext);
  const isSelected = ctx?.value === value;

  React.useEffect(() => {
    if (isSelected) {
      ctx?.setSelectedLabel(children);
    }
  }, [isSelected, children]);

  return (
    <div
      onClick={() => ctx?.onValueChange?.(value)}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-xs font-medium text-nx-ink outline-none hover:bg-nx-ground hover:text-nx-accent focus:bg-nx-ground focus:text-nx-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        isSelected && "bg-nx-ground text-nx-accent",
        className,
      )}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      <span className="truncate">{children}</span>
    </div>
  );
}

export function SelectGroup({ children }: { children: React.ReactNode }) {
  return <div className="py-1">{children}</div>;
}
