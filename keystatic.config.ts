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
