// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const SITE_URL = "https://zenmartialarts.ca";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
