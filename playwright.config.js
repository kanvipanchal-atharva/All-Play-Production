import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  use: { baseURL: "http://127.0.0.1:3100", headless: true },
  webServer: {
    command: "node server/index.js",
    url: "http://127.0.0.1:3100/api/health",
    env: { PORT: '3100', HOST: '127.0.0.1', CORS_ORIGINS: 'http://127.0.0.1:3100' },
    reuseExistingServer: false,
  },
  reporter: "list",
});
