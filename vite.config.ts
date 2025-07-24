import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@chatComponent": "/src/components/chat",
      "@components": "/src/components",
      "@context": "/src/context",
      "@hooks": "/src/hooks",
      "@pages": "/src/pages",
      "@services": "/src/services",
      "@utils": "/src/utils",
      "@routes": "/src/routes",
      "@store": "/src/store",
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: [
      "joblinc.me",
      "www.https://joblinc-production.up.railway.app",
      "joblinc-production.up.railway.app",
    ],
  },
});
