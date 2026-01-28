import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // test: {
  //   environment: "happy-dom",
  //   setupFiles: ["./src/test/setup.ts"],
  //   globals: true,
  //   restoreMocks: true,
  //   clearMocks: true,
  //   env: {
  //     VITE_API_URL: "https://lendsqr-be-rq0x.onrender.com",
  //   },
  // },
});
