import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: "assets/tenure-form.js",
        chunkFileNames: "assets/tenure-form.js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "";

          if (name.endsWith(".css")) {
            return "assets/tenure-form.css";
          }

          return "assets/[name][extname]";
        },
      },
    },
  },
});