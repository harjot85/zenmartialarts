// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

const SITE_URL = "https://zenmartialarts.ca";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  integrations: [
    sitemap({
      // Terms and Privacy are noindex until the owner's lawyer reviews them.
      filter: (page) =>
        !["/terms/", "/privacy/"].some((path) => page.endsWith(path)),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
