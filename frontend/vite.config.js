import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom", // for DOM testing
    setupFiles: "./src/setupTests.js", // like CRA
  },
});
