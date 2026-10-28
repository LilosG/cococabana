import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const giftCardsPage = defineCollection({
  loader: glob({ pattern: 'gift-cards.json', base: './src/content/pages' }),
  schema: z.object({
    seoTitle: z.string(), seoDescription: z.string(), heroEyebrow: z.string(), heroTitle: z.string(), heroText: z.string(),
    heroImage: z.object({ src: z.string(), alt: z.string(), focal: z.string(), focalDesktop: z.string() }),
    intro: z.object({ eyebrow: z.string(), title: z.string(), accent: z.string(), body: z.string(), image: z.string(), imageAlt: z.string(), focal: z.string(), focalDesktop: z.string() }),
    purchaseUrl: z.url(), balanceUrl: z.url(), purchaseLabel: z.string(), balanceLabel: z.string(), checkoutNote: z.string(),
    stepsHeading: z.string(), steps: z.array(z.object({ title: z.string(), body: z.string() })).length(3),
    guidesHeading: z.string(), guides: z.array(z.object({ label: z.string(), href: z.string() })).length(2),
    faqTitle: z.string(), faqs: z.array(z.object({ q: z.string(), a: z.string() })),
    final: z.object({ eyebrow: z.string(), title: z.string(), body: z.string() }),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    seoTitle: z.string().optional(),
    imageAlt: z.string().optional(),
    answerSummary: z.string().optional(),
    giftCardCta: z.boolean().default(false),
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

export const collections = { blog, giftCardsPage };
