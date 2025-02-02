import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  base: "/imagegallery",
  // Added absolute import but vs code eslint keeps throwing error
  // so had to use relative import for now
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
