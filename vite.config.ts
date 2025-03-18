import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
//import { path } from "path-browserify"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    setupFiles: "./test/setupTests.ts",
    environment: "jsdom",
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: ["joblinc.me", "www.joblinc.me"],
  },

  /*     resolve: {
    alias: {
      "@chatComponent": path.resolve(__dirname, "src/components/chat"),
    },
  }, */
});
