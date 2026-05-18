import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
