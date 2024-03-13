import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BASE_PATH,
  plugins: [react()],
  // https://ui.shadcn.com/docs/installation/vite#update-viteconfigts
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
