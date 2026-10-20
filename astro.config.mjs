import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

// Blog markdown links to "/reserve"; resolve to the single reservations URL in venue.json.
const reservationsUrl = JSON.parse(readFileSync(new URL('./src/content/data/venue.json', import.meta.url), 'utf8')).reservationsUrl;
function remarkReservationsLink() {
  const walk = (node) => {
    if (node.type === 'link' && node.url === '/reserve') node.url = reservationsUrl;
    node.children?.forEach(walk);
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  site: 'https://cococabanaoside.com',
  markdown: { remarkPlugins: [remarkReservationsLink] },
  image: { responsiveStyles: true },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react(), keystatic(), sitemap()],
  adapter: vercel()
});
