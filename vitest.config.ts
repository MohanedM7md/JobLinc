/// <reference types="vitest" />
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@chatComponent": "/src/components/chat",
      "@components": "/src/components",
      "@context": "/src/context",
      "@hooks": "/src/hooks",
      "@pages": "/src/pages",
      "@services": "/src/services",
      "@utils": "/src/utils",
      "@store": "/src/store",
    },
  },
  test: {
    globals: true,
    setupFiles: "./test/setupTests.ts",
    environment: "jsdom",
  },
});
