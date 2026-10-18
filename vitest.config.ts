import { defineConfig } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    globals: true,
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next", "dist"],
    testTimeout: 15000,
  },
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "./src"),
      "@engine": path.resolve(rootDir, "./src/engine"),
      "@content": path.resolve(rootDir, "./src/data/content"),
      "@locales": path.resolve(rootDir, "./src/locales"),
      "@core/ui": path.resolve(rootDir, "./src/components/ui"),
      "@/core/ui": path.resolve(rootDir, "./src/components/ui"),
      "@core/common/utils": path.resolve(rootDir, "./src/lib/utils"),
      "@core/config/branding": path.resolve(rootDir, "./src/lib/branding"),
      "@core/providers/theme-provider": path.resolve(
        rootDir,
        "./src/engine/providers/ThemeProvider",
      ),
      "@modules/docs": path.resolve(rootDir, "./src"),
    },
  },
});
