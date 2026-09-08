import { configDefaults, defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["**/__tests__/**/*.test.{ts,tsx}"],
    exclude: [...configDefaults.exclude, "**/.claude/**", "**/.agents/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
