import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    ogImage: z.string().optional(),
    // FAQ content, rendered on-page and wired into FAQPage JSON-LD.
    // Frontmatter key is normalized to `faq` across all posts.
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    // Preserved for future internal-linking / topical work. Not yet
    // consumed by any template — was previously silently dropped by
    // this schema, which is a separate issue from why it's unused.
    relatedServices: z.array(z.string()).optional(),
    relatedCities: z.array(z.string()).optional(),
    serviceAreas: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
