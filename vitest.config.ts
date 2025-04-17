/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@chatComponent": "/src/components/chat",
      "@component": "/src/components",
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
