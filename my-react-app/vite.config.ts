import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@domain": path.resolve(__dirname, "domain"),
      "@http-services": path.resolve(__dirname, "http-services"),
      "@custom-hook": path.resolve(__dirname, "custom-hook"),
    },
  },
});
