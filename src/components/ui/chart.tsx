"use client";

export const CHART_TOKEN_PALETTE = [
  "#c6ff00",
  "#38bdf8",
  "#a855f7",
  "#f97316",
  "#10b981",
  "#f43f5e",
  "#eab308",
  "#6366f1",
] as const;

export function chartColor(slot: number): string {
  const size = CHART_TOKEN_PALETTE.length;
  const index = (((Math.trunc(slot) - 1) % size) + size) % size;
  return CHART_TOKEN_PALETTE[index];
}

export function chartPalette(count: number): string[] {
  return Array.from({ length: count }, (_, i) => chartColor(i + 1));
}
