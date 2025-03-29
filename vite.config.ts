import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import path from "path-browserify";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@chatComponent": path.resolve(__dirname, "src/components/chat/*"),
      "@context": path.resolve(__dirname, "src/context/*"),
      "@hooks": path.resolve(__dirname, "src/hooks/*"),
      "@pages": path.resolve(__dirname, "src/pages/*"),
      "@services": path.resolve(__dirname, "src/services/*"),
      "@utils": path.resolve(__dirname, "src/utils/*"),
      "@store": path.resolve(__dirname, "src/store/*"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: ["joblinc.me", "www.joblinc.me"],
  },
});
