# Cococabana Keystatic Audit

Audit date: 2026-07-14  
Scope: read-only inspection of the Astro project, Keystatic schema, content files, page/component sources, and local Vercel linkage metadata.

## Executive summary

Keystatic is installed and registered with Astro. It uses Keystatic Cloud project `gph-websites/cococabana`, has a custom brand name, 13 singletons, and 2 collections. The singleton identifiers themselves map cleanly to their expected admin URLs, and there are no `fields.object()` layout arrays (so the BET-style layout-span mismatch is not present).

The setup is only partially client-ready:

- `ui.brand.name` is customized, but `ui.navigation` is absent, so navigation remains Keystatic's default grouping/order.
- Field labels are extensively customized, but field descriptions are almost entirely absent.
- Most page body copy, page imagery, alt text, CTAs, navigation/footer copy, form configuration, and structured-data copy remain hardcoded.
- Several templates reference CMS properties that do not exist in the corresponding schema or JSON. Those fields will resolve as `undefined` at runtime and are not editable in Keystatic.
- The Keystatic blog schema and Astro content-collection schema disagree about date/category fields.

## 1. Keystatic packages and Astro integration

Both required packages are installed under `dependencies` in `package.json`:

```json
"@keystatic/astro": "^5.1.0",
"@keystatic/core": "^0.5.50"
```

The integration is also registered in `astro.config.mjs`:

```ts
import keystatic from '@keystatic/astro';

integrations: [react(), keystatic(), sitemap()],
```

Conclusion: **installed and enabled**.

## 2. Full `keystatic.config.ts`

```ts
import { collection, config, fields, singleton } from '@keystatic/core';

const imagePathField = (label: string) =>
  fields.text({
    label,
    description: 'Use a public image path, for example /photos/example.jpg',
  });

const optionalText = (label: string) =>
  fields.text({
    label,
    validation: { isRequired: false },
  });

const optionalMultiline = (label: string) =>
  fields.text({
    label,
    multiline: true,
    validation: { isRequired: false },
  });

const menuItemFields = fields.object({
  name: optionalText('Item Name'),
  description: optionalMultiline('Description'),
  image: imagePathField('Image Path'),
  imageAlt: fields.text({ label: 'Image Alt Text' }),
  imagePosition: optionalText('Image Position Class'),
});

const brunchItemFields = fields.object({
  name: fields.text({ label: 'Item Name' }),
  description: optionalMultiline('Description'),
  image: imagePathField('Image Path'),
  imageAlt: fields.text({ label: 'Image Alt Text' }),
  imagePosition: optionalText('Image Position Class'),
});

const eventCardFields = fields.object({
  image: imagePathField('Image Path'),
  imageAlt: fields.text({ label: 'Image Alt Text' }),
  imagePosition: optionalText('Image Position Class'),
  category: fields.text({ label: 'Category' }),
  title: fields.text({ label: 'Title' }),
  description: fields.text({ label: 'Description', multiline: true }),
  detail: fields.text({ label: 'Detail' }),
  href: optionalText('Page Link'),
});

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'gph-websites/cococabana',
  },
  ui: {
    brand: {
      name: 'Cococabana CMS',
    },
  },
  singletons: {
    venueData: singleton({
      label: 'Venue / Business Data',
      path: 'src/content/data/venue',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Short Name' }),
        fullName: fields.text({ label: 'Full Name' }),
        wordmark: fields.text({ label: 'Wordmark' }),
        tagline: fields.text({ label: 'Tagline' }),
        hotel: fields.text({ label: 'Hotel / Building' }),

        address: fields.object({
          street: fields.text({ label: 'Street' }),
          city: fields.text({ label: 'City' }),
          state: fields.text({ label: 'State' }),
          zip: fields.text({ label: 'ZIP' }),
        }),

        phone: fields.text({ label: 'Phone' }),
        phoneHref: fields.text({ label: 'Phone Link' }),

        social: fields.object({
          instagram: fields.url({ label: 'Instagram URL' }),
          instagramHandle: fields.text({ label: 'Instagram Handle' }),
        }),

        reservationsUrl: fields.url({ label: 'Reservations URL' }),
        orderUrl: fields.url({ label: 'Order URL' }),

        coordinates: fields.object({
          latitude: fields.number({ label: 'Latitude' }),
          longitude: fields.number({ label: 'Longitude' }),
        }),

        schemaHours: fields.array(
          fields.object({
            dayOfWeek: fields.text({ label: 'Day of Week' }),
            opens: fields.text({ label: 'Opens' }),
            closes: fields.text({ label: 'Closes' }),
          }),
          {
            label: 'Schema Hours',
            itemLabel: props => props.fields.dayOfWeek.value || 'Day',
          }
        ),

        mapsUrl: fields.url({ label: 'Google Maps URL' }),
        mapsEmbedUrl: fields.url({ label: 'Google Maps Embed URL' }),

        hours: fields.object({
          schedule: fields.array(
            fields.object({
              days: fields.text({ label: 'Days' }),
              hours: fields.text({ label: 'Hours' }),
            }),
            {
              label: 'Displayed Hours',
              itemLabel: props => props.fields.days.value || 'Hours Row',
            }
          ),
          shortSummary: fields.text({ label: 'Short Hours Summary' }),
        }),

        brunch: fields.object({
          days: fields.text({ label: 'Brunch Days' }),
          hours: fields.text({ label: 'Brunch Hours' }),
          highlight: fields.text({ label: 'Brunch Highlight' }),
        }),

        djNights: fields.object({
          days: fields.text({ label: 'DJ Days' }),
          label: fields.text({ label: 'DJ Label' }),
        }),

        routes: fields.object({
          privateEvents: fields.text({ label: 'Private Events Route' }),
          privateEventsBirthday: fields.text({ label: 'Birthday Events Route' }),
          privateEventsCelebrations: fields.text({ label: 'Celebrations Route' }),
          privateEventsCorporate: fields.text({ label: 'Corporate Events Route' }),
          privateEventsRehearsal: fields.text({ label: 'Rehearsal Dinners Route' }),
          menu: fields.text({ label: 'Menu Route' }),
          venue: fields.text({ label: 'Venue Route' }),
          brunch: fields.text({ label: 'Brunch Route' }),
          faq: fields.text({ label: 'FAQ Route' }),
          contact: fields.text({ label: 'Contact Route' }),
          blog: fields.text({ label: 'Blog Route' }),
        }),
      },
    }),

    menuData: singleton({
      label: 'Menu Data',
      path: 'src/content/data/menu',
      format: { data: 'json' },
      schema: {
        menuSections: fields.array(
          fields.object({
            id: fields.text({ label: 'Section ID' }),
            heading: fields.text({ label: 'Heading' }),
            category: fields.text({ label: 'Category: food or drinks' }),
            tone: fields.text({ label: 'Tone: light or dark' }),
            items: fields.array(menuItemFields, {
              label: 'Menu Items',
              itemLabel: props => props.fields.name.value || 'Menu Item',
            }),
          }),
          {
            label: 'Menu Sections',
            itemLabel: props => props.fields.heading.value || 'Menu Section',
          }
        ),
      },
    }),

    brunchData: singleton({
      label: 'Brunch Data',
      path: 'src/content/data/brunch',
      format: { data: 'json' },
      schema: {
        brunchFood: fields.array(brunchItemFields, {
          label: 'Brunch Food',
          itemLabel: props => props.fields.name.value || 'Brunch Food Item',
        }),
        brunchDrinks: fields.array(brunchItemFields, {
          label: 'Brunch Drinks',
          itemLabel: props => props.fields.name.value || 'Brunch Drink',
        }),
      },
    }),

    privateEventsData: singleton({
      label: 'Private Events Cards',
      path: 'src/content/data/events',
      format: { data: 'json' },
      schema: {
        privateEvents: fields.array(eventCardFields, {
          label: 'Private Event Cards',
          itemLabel: props => props.fields.title.value || 'Private Event',
        }),
      },
    }),

    faqData: singleton({
      label: 'FAQ Data',
      path: 'src/content/data/faqs',
      format: { data: 'json' },
      schema: {
        faqs: fields.array(
          fields.object({
            id: fields.text({ label: 'ID' }),
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          {
            label: 'FAQs',
            itemLabel: props => props.fields.question.value || 'FAQ',
          }
        ),
      },
    }),

    siteSettings: singleton({
      label: 'Site Settings',
      path: 'src/content/site/settings',
      format: { data: 'json' },
      schema: {
        businessName: fields.text({ label: 'Business Name' }),
        phone: fields.text({ label: 'Phone' }),
        email: optionalText('Email'),
        address: fields.text({ label: 'Address' }),
        instagramUrl: fields.url({ label: 'Instagram URL', validation: { isRequired: false } }),
      },
    }),

    homePage: singleton({
      label: 'Home Page Copy',
      path: 'src/content/pages/home',
      format: { data: 'json' },
      schema: {
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        heroEyebrow: fields.text({ label: 'Hero Eyebrow' }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        heroText: fields.text({ label: 'Hero Text', multiline: true }),
        primaryCtaText: fields.text({ label: 'Primary CTA Text' }),
        primaryCtaHref: fields.text({ label: 'Primary CTA Link' }),
        secondaryCtaText: fields.text({ label: 'Secondary CTA Text' }),
        secondaryCtaHref: fields.text({ label: 'Secondary CTA Link' }),
      },
    }),

    venuePage: singleton({
      label: 'Venue Page Copy',
      path: 'src/content/pages/venue',
      format: { data: 'json' },
      schema: {
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        heroText: fields.text({ label: 'Hero Text', multiline: true }),
        sections: fields.array(
          fields.object({
            title: fields.text({ label: 'Section Title' }),
            text: fields.text({ label: 'Section Text', multiline: true }),
          }),
          {
            label: 'Sections',
            itemLabel: props => props.fields.title.value || 'Section',
          }
        ),
      },
    }),

    menuPage: singleton({
      label: 'Menu Page Copy',
      path: 'src/content/pages/menu',
      format: { data: 'json' },
      schema: {
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        heroText: fields.text({ label: 'Hero Text', multiline: true }),
      },
    }),

    brunchPage: singleton({
      label: 'Brunch Page Copy',
      path: 'src/content/pages/brunch',
      format: { data: 'json' },
      schema: {
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        heroText: fields.text({ label: 'Hero Text', multiline: true }),
      },
    }),

    privateEventsPage: singleton({
      label: 'Private Events Landing Page Copy',
      path: 'src/content/pages/private-events',
      format: { data: 'json' },
      schema: {
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        heroText: fields.text({ label: 'Hero Text', multiline: true }),
        eventTypes: fields.array(
          fields.object({
            title: fields.text({ label: 'Event Type' }),
            description: fields.text({ label: 'Description', multiline: true }),
            href: fields.text({ label: 'Page Link' }),
          }),
          {
            label: 'Event Types',
            itemLabel: props => props.fields.title.value || 'Event Type',
          }
        ),
      },
    }),

    faqPage: singleton({
      label: 'FAQ Page Copy',
      path: 'src/content/pages/faq',
      format: { data: 'json' },
      schema: {
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        heroTitle: fields.text({ label: 'Hero Title' }),
      },
    }),

    contactPage: singleton({
      label: 'Contact Page Copy',
      path: 'src/content/pages/contact',
      format: { data: 'json' },
      schema: {
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        heroText: fields.text({ label: 'Hero Text', multiline: true }),
        formIntro: fields.text({ label: 'Form Intro', multiline: true }),
      },
    }),
  },

  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: {
        contentField: 'content',
      },
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
          },
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        pubDate: fields.date({
          label: 'Publish Date',
          validation: { isRequired: false },
        }),
        updatedDate: fields.date({
          label: 'Updated Date',
          validation: { isRequired: false },
        }),
        content: fields.markdoc({
          label: 'Content',
        }),
      },
    }),

    privateEventPages: collection({
      label: 'Private Event Detail Pages',
      slugField: 'title',
      path: 'src/content/private-events/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
          },
        }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        heroText: fields.text({ label: 'Hero Text', multiline: true }),
        sections: fields.array(
          fields.object({
            title: fields.text({ label: 'Section Title' }),
            text: fields.text({ label: 'Section Text', multiline: true }),
          }),
          {
            label: 'Sections',
            itemLabel: props => props.fields.title.value || 'Section',
          }
        ),
      },
    }),
  },
});
```

## 3. Full Astro content-collection configuration

The file exists at `src/content.config.ts` (not at repository root):

```ts
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
  }),
});

export const collections = { blog };
```

Only `blog` is registered as an Astro content collection. The JSON-backed Keystatic content is consumed through direct JSON imports in `src/lib/cms.ts` and adapter files in `src/data/`.

### Schema inconsistency: Keystatic blog vs Astro blog

The two blog schemas do not agree:

| Concern | Keystatic `blog` | Astro `blog` / current Markdown |
|---|---|---|
| Date | `pubDate` (optional), `updatedDate` (optional) | `date` (required) |
| Category | Not defined | `category` (required) |
| Open Graph image | Not defined | `ogImage` (optional) |
| Body | `content` Markdoc field | Markdown body loaded by Astro |

All four current posts use `date` and `category`, not `pubDate`. Editing/saving through Keystatic risks an invalid or incomplete Astro entry unless these schemas are aligned.

## 4. Content inventory and remaining hardcoded content

### Files under `src/content/`

| Content directory/type | File count | Keystatic mapping |
|---|---:|---|
| `blog/` | 4 | `blog` collection |
| `data/` | 5 | `venueData`, `menuData`, `brunchData`, `privateEventsData`, `faqData` singletons |
| `pages/` | 7 | `homePage`, `venuePage`, `menuPage`, `brunchPage`, `privateEventsPage`, `faqPage`, `contactPage` singletons |
| `private-events/` | 4 | `privateEventPages` collection |
| `site/` | 1 | `siteSettings` singleton |
| **Total** | **21** | 13 singletons + 2 collections |

Individual files:

- Blog: `best-bars-oceanside.md`, `best-brunch-oceanside.md`, `best-happy-hour-oceanside.md`, `best-rooftop-bar-oceanside.md`.
- Data: `brunch.json`, `events.json`, `faqs.json`, `menu.json`, `venue.json`.
- Pages: `brunch.json`, `contact.json`, `faq.json`, `home.json`, `menu.json`, `private-events.json`, `venue.json`.
- Private event pages: `birthday-parties.json`, `celebrations.json`, `corporate-events.json`, `rehearsal-dinners.json`.
- Site: `settings.json`.

### Hardcoded content not wired to a singleton or collection

The following is still authored directly in `.astro` or `src/data/` rather than represented by editable Keystatic fields:

| Source | Hardcoded content |
|---|---|
| `src/pages/index.astro` | Nearly all post-hero section headings, eyebrow text, paragraphs, feature/tick lists, CTA labels, stats labels/fallback text, all page-level image selections and alt text, the atmosphere gallery, and several section anchor/layout decisions. |
| `src/pages/venue.astro` | Stats strip, all body-section copy, tags, CTA labels, 11 page images and their alt/position settings, gallery configuration, and final CTA copy. The singleton's `sections` array is not used. |
| `src/pages/menu.astro` | Food/cocktail section intros and labels, brunch promo copy/CTAs, reserve CTA band, hero/brunch banner images and alt text. |
| `src/pages/brunch.astro` | Stats, menu/bar section introductions, mimosa promo, rooftop promo, reserve band, CTA labels, three page images and alt text. |
| `src/pages/private-events.astro` | Stats, “What We Host” list/copy, event-grid headings, setting copy, three-step process, CTA band, three page images and alt text. The singleton's `eventTypes` array is not used; cards instead come from the separate `privateEventsData` singleton. |
| `src/pages/faq.astro` | FAQ JSON-LD canonical URLs, hero image/alt, and the final CTA block/labels. |
| `src/pages/contact.astro` | Reservation/event/location cards, hours/map section labels, Toast form heading/subheading, social CTA copy, hero image/alt, and CTA labels. The singleton's `formIntro` is not used. |
| `src/pages/private-events/birthday-parties.astro` | Service JSON-LD strings/URLs, stats, all body sections, feature list, process, CTA copy, four images and their alt/position settings. The collection entry's `sections` array is not used. |
| `src/pages/private-events/celebrations.astro` | Service JSON-LD strings/URLs, stats, all body sections, feature list, process, CTA copy, four images and their alt/position settings. The collection entry's `sections` array is not used. |
| `src/pages/private-events/corporate-events.astro` | Service JSON-LD strings/URLs, stats, all body sections, feature list, process, CTA copy, four images and their alt/position settings. The collection entry's `sections` array is not used. |
| `src/pages/private-events/rehearsal-dinners.astro` | Service JSON-LD strings/URLs, stats, all body sections, feature list, process, CTA copy, four images and their alt/position settings. The collection entry's `sections` array is not used. |
| `src/components/Nav.astro` | Navigation link labels/order, “Order Online”/“Reserve” labels, mobile-menu accessibility copy, and logo asset. Routes themselves come from `venueData`. |
| `src/components/Footer.astro` | Footer section labels, navigation labels/order, descriptive copy, CTA labels, agency credit/URL, and logo asset. |
| `src/components/ToastEventForm.astro` | Default eyebrow/heading/subheading, Toast lead-form iframe URL and title, iframe height, and phone fallback text/number. |
| `src/components/EventInquiryForm.astro` | Entire native form definition: endpoint placeholder, event-type options, field labels/placeholders, guest ranges, referral options, success/follow-up messages. This component is currently superseded on pages by the Toast component but remains hardcoded source content. |
| `src/layouts/Layout.astro` | Production URL in JSON-LD, schema type, cuisine list, price range, country, font URLs, and favicon. |
| `src/data/gphNetwork.ts` | Six GPH venue names/URLs plus the Grind & Prosper URL. This is the only `src/data/` file whose actual content is not an adapter over `src/content/` JSON. |

`src/data/venue.ts`, `menu.ts`, `brunch.ts`, `events.ts`, and `faqs.ts` are adapters over Keystatic-managed JSON and therefore are already wired.

### CMS/template property mismatches

These properties are referenced by templates but absent from the named Keystatic schema and current JSON:

| Content source | Missing properties used by template |
|---|---|
| `homePage` | `heroSubtitle` (schema/JSON instead provide `heroText`, which the template does not use) |
| `venuePage` | `heroEyebrow`, `primaryCtaText`, `secondaryCtaText` |
| `menuPage` | `heroEyebrow`, `primaryCtaText` |
| `brunchPage` | `heroEyebrow`, `heroSubtitle`, `primaryCtaText`, `secondaryCtaText`, `secondaryCtaHref` |
| `privateEventsPage` | `heroEyebrow`, `primaryCtaText`, `primaryCtaHref`, `secondaryCtaText`, `secondaryCtaHref` |
| `faqPage` | `heroEyebrow`, `heroText`, `primaryCtaText` |
| `contactPage` | `heroEyebrow`, `primaryCtaText` |
| Every `privateEventPages` item | `heroEyebrow`, `primaryCtaText`, `primaryCtaHref`, `secondaryCtaText` |

This is more than an editing limitation: those values are currently undefined in the imported JSON objects.

Additional content/schema drift:

- `src/content/data/venue.json` contains `url`, which is used by `Footer.astro`, but `venueData.schema` does not define it. It is therefore not editable in Keystatic and could be lost/ignored during CMS editing.
- `src/content/pages/menu.json` and `brunch.json` contain `sections`, but their singleton schemas do not define `sections`; the templates do not consume those arrays.
- `src/content/pages/faq.json` contains `faqs`, but `faqPage` does not define it; the live FAQ list correctly comes from the separate `faqData` singleton instead.
- `siteSettings` is exported from `src/lib/cms.ts` but no page/component imports it, so its values currently do not control the rendered site.

## 5. Storage configuration

```ts
storage: {
  kind: 'cloud',
},
cloud: {
  project: 'gph-websites/cococabana',
},
```

- `storage.kind`: **`cloud`**
- `cloud.project`: **`gph-websites/cococabana`**

## 6. Keystatic UI branding and navigation

Current settings:

```ts
ui: {
  brand: {
    name: 'Cococabana CMS',
  },
},
```

- `ui.brand`: **customized** with a client-friendly name, `Cococabana CMS`.
- No brand logo is configured.
- `ui.navigation`: **not configured**. Keystatic will use its default singleton/collection navigation rather than curated client-facing groups and ordering.

Verdict: branding is partially client-friendly; navigation is still default/unconfigured.

## 7. Singleton identifiers and expected admin routes

Keystatic routes use the singleton object key, not the human-readable label or storage filename.

| Singleton identifier | Label | Expected route | Result |
|---|---|---|---|
| `venueData` | Venue / Business Data | `/keystatic/singleton/venueData` | Match |
| `menuData` | Menu Data | `/keystatic/singleton/menuData` | Match |
| `brunchData` | Brunch Data | `/keystatic/singleton/brunchData` | Match |
| `privateEventsData` | Private Events Cards | `/keystatic/singleton/privateEventsData` | Match |
| `faqData` | FAQ Data | `/keystatic/singleton/faqData` | Match |
| `siteSettings` | Site Settings | `/keystatic/singleton/siteSettings` | Match |
| `homePage` | Home Page Copy | `/keystatic/singleton/homePage` | Match |
| `venuePage` | Venue Page Copy | `/keystatic/singleton/venuePage` | Match |
| `menuPage` | Menu Page Copy | `/keystatic/singleton/menuPage` | Match |
| `brunchPage` | Brunch Page Copy | `/keystatic/singleton/brunchPage` | Match |
| `privateEventsPage` | Private Events Landing Page Copy | `/keystatic/singleton/privateEventsPage` | Match |
| `faqPage` | FAQ Page Copy | `/keystatic/singleton/faqPage` | Match |
| `contactPage` | Contact Page Copy | `/keystatic/singleton/contactPage` | Match |

No hardcoded `/keystatic/singleton/...` links were found elsewhere in the repository, so there is no stale link using a label, path basename, or incorrect identifier. **No BET-class singleton route mismatch found.**

For completeness, collection routes are `/keystatic/collection/blog` and `/keystatic/collection/privateEventPages`.

## 8. `fields.object()` layout audit

There are 17 `fields.object({...})` definitions in `keystatic.config.ts`:

- Shared objects: `menuItemFields`, `brunchItemFields`, `eventCardFields`.
- Venue objects: `address`, `social`, `coordinates`, schema-hour item, `hours`, displayed-hour item, `brunch`, `djNights`, `routes`.
- Other objects: menu-section item, FAQ item, venue-page section item, private-event-type item, private-event-detail section item.

Search result: **none of these objects has a `layout` property**. Therefore there are no layout arrays to enumerate and no field-count/layout-entry-count mismatches. **The BET home-singleton span bug class is not present.**

## 9. Field labels and descriptions

The schema is not using wholly default Keystatic labels:

- Leaf fields and arrays consistently provide explicit, human-readable labels such as `SEO Description`, `Primary CTA Text`, `Image Alt Text`, `Google Maps Embed URL`, and `Private Event Detail Pages`.
- Array item labels are customized through `itemLabel` callbacks.
- Nested `fields.object()` containers do not pass their own label/options object, so container names such as `address`, `social`, `coordinates`, `djNights`, and `routes` may still be displayed from their camelCase field keys/default formatting.
- Only the shared image-path field has a description: `Use a public image path, for example /photos/example.jpg`.
- No other field help descriptions were found.

Verdict: **labels are substantially customized; descriptions are nearly absent, and some object-container labeling remains default-generated.**

## 10. Images, forms, and dynamic components missing editable schema fields

### Images

The schema only exposes image paths for menu items, brunch items, and private-event cards, and those are plain text paths rather than Keystatic `fields.image()` fields. The following remain outside the schema:

- Home: 13 imported page images (hero, sections, gallery, events) plus their alt text and position/crop classes.
- Venue: 11 imported page images plus alt text and position/crop classes.
- Menu: 2 imported page images plus alt text/position.
- Brunch: 3 imported page images plus alt text/position.
- Private-events landing: 3 imported page images plus alt text/position.
- FAQ: 1 imported hero image plus alt text.
- Contact: 1 imported hero image plus alt text.
- Four private-event detail pages: 4 imported images per page (16 page assignments total), plus alt text/position.
- Shared nav/footer logo asset.
- Layout favicon and default/social OG image handling (page `ogImage` is supported by `Layout`, but most page singletons expose no OG-image field; the blog Astro schema has `ogImage` while Keystatic does not).

### Forms

- `ToastEventForm.astro` embeds a hardcoded Toast lead iframe URL containing restaurant/account identifiers. Its heading/subheading can be passed by a page but are not backed by schema fields in current use. Its eyebrow, iframe title/height, fallback prompt, phone link, and phone display are hardcoded.
- `EventInquiryForm.astro` contains a complete hardcoded native form and a placeholder `action="#"`. Its endpoint, field/options configuration, labels, placeholders, consent/follow-up copy, and success message have no Keystatic fields.
- `contactPage.formIntro` exists in the schema/JSON but is not consumed by the current contact page.

### Dynamic/shared components and configuration

- Nav labels/order and footer labels/order/content have no global navigation/footer schema.
- Home “hours today” client-side display and fallback values are hardcoded; business hours themselves come from `venueData`.
- Page section structures (stats, split sections, full-bleed banners, galleries, feature tags, tick lists, and CTA bands) are fixed in templates and are not modeled as editable component blocks.
- Service/FAQ/business JSON-LD includes hardcoded canonical URLs and descriptive strings not fully derived from editable fields.
- Analytics reads `PUBLIC_GA_MEASUREMENT_ID` from the environment; it is intentionally environment-driven rather than Keystatic-driven, but its event names/rules are hardcoded.
- GPH network/footer links and the agency credit are hardcoded outside Keystatic.

## 11. Vercel linkage and production domain

The repository is linked to Vercel. `.vercel/project.json` contains:

```json
{"projectId":"prj_nsuklNS69KiCXXXTxmz0MZ4ogvek","orgId":"team_Smelc7J6assvIEjIVYurHDrT","projectName":"cococabana"}
```

- Linked project: **`cococabana`**
- Project ID: **`prj_nsuklNS69KiCXXXTxmz0MZ4ogvek`**
- Team/org ID: **`team_Smelc7J6assvIEjIVYurHDrT`**
- Configured production site/domain: **`https://cococabanaoside.com`**, from `astro.config.mjs` (`site: 'https://cococabanaoside.com'`) and consistent canonical URLs in project source.

The local Vercel linkage file does not itself store a production-domain field. The domain above is the project's configured canonical production domain; this read-only audit did not query the live Vercel API to independently verify the current domain assignment.
