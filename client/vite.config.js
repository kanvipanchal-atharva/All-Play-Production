import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync } from "node:fs";
const schema = readFileSync(
  new URL("./public/organization.jsonld", import.meta.url),
  "utf8",
).trim();
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "inline-structured-data",
      transformIndexHtml(html) {
        return html.replace(
          '<script type="application/ld+json" src="/organization.jsonld"></script>',
          `<script type="application/ld+json">${schema}</script>`,
        );
      },
    },
  ],
  server: { port: 5173, strictPort: true, proxy: { "/api": "http://127.0.0.1:3000" } },
  build: { target: "es2022" },
});
