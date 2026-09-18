import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cococabanaoside.com',
  image: { responsiveStyles: true },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react(), keystatic(), sitemap()],
  adapter: vercel()
});
