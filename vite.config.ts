import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
//import { path } from "path-browserify"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: ["joblinc.me","www.joblinc.me"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
  },
/*     resolve: {
    alias: {
      "@chatComponent": path.resolve(__dirname, "src/components/chat"),
    },
  }, */
});
