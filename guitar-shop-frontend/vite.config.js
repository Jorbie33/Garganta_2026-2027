import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The Django backend runs on :8000. Vite forwards /api and /media to it,
// so the React code only ever calls relative URLs and CORS is never a problem in dev.
const backend = process.env.BACKEND_URL || "http://localhost:8000";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": backend,
      "/media": backend,
    },
  },
});
