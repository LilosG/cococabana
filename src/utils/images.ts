import type { ImageMetadata } from 'astro';

const photos = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/**/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

export function getPhoto(path: string): ImageMetadata {
  const key = `/src/assets${path}`;
  const mod = photos[key];
  if (!mod?.default) throw new Error(`Photo not found: ${path} (key: ${key})`);
  return mod.default;
}
