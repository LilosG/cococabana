import { collection, config, fields, singleton } from "@keystatic/core";

const fieldDescription = (label: string) => `Edit the ${label.toLowerCase()}.`;

const textField = (label: string, description = fieldDescription(label)) =>
  fields.text({ label, description });

const optionalText = (label: string, description = fieldDescription(label)) =>
  fields.text({
    label,
    description,
    validation: { isRequired: false },
  });

const multiline = (label: string, description = fieldDescription(label)) =>
  fields.text({ label, description, multiline: true });

const optionalMultiline = (
  label: string,
  description = fieldDescription(label),
) =>
  fields.text({
    label,
    description,
    multiline: true,
    validation: { isRequired: false },
  });

const imageField = (
  label = "Image",
  description = "Choose or upload an image.",
) =>
  fields.image({
    label,
    description,
    directory: "src/assets/photos",
    publicPath: "/photos/",
  });

const imagePositionField = optionalText(
  "Image Position",
  "Optional CSS classes that control the image crop and position.",
);

const sharedPhotoPathField = (label = "Image Path") =>
  fields.text({
    label,
    description:
      "References an existing shared photo asset. Do not change this value without providing a new working image path.",
  });

const imageObjectFields = {
  src: imageField(),
  alt: textField("Alternative Text", "Describe the image for accessibility."),
  position: imagePositionField,
};

const statFields = fields.object(
  {
    value: optionalText("Value", "Enter the highlighted value."),
    label: textField("Label", "Enter the supporting label."),
    detail: optionalText("Detail", "Add optional supporting detail."),
  },
  { label: "Statistic", description: "A highlighted venue fact or detail." },
);

const textList = (label: string, description: string) =>
  fields.array(multiline("Text", "Enter one paragraph."), {
    label,
    description,
    itemLabel: () => "Paragraph",
  });

const linkFields = fields.object(
  {
    href: textField("Link", "Enter the destination path or URL."),
    label: textField("Label", "Enter the text shown for this link."),
  },
  { label: "Link", description: "A navigation link and its destination." },
);

const menuItemFields = fields.object(
  {
    name: optionalText("Item Name", "Enter the menu item name."),
    description: optionalMultiline(
      "Description",
      "Add an optional menu item description.",
    ),
    image: imageField("Image", "Choose the menu item image."),
    imageAlt: textField(
      "Alternative Text",
      "Describe the image for accessibility.",
    ),
    imagePosition: imagePositionField,
  },
  {
    label: "Menu Item",
    description: "A food or drink item shown on the menu.",
  },
);

const brunchItemFields = fields.object(
  {
    name: textField("Item Name", "Enter the brunch item name."),
    description: optionalMultiline(
      "Description",
      "Add an optional brunch item description.",
    ),
    image: imageField("Image", "Choose the brunch item image."),
    imageAlt: textField(
      "Alternative Text",
      "Describe the image for accessibility.",
    ),
    imagePosition: imagePositionField,
  },
  {
    label: "Brunch Item",
    description: "A food or drink item shown on the brunch menu.",
  },
);

const eventCardFields = fields.object(
  {
    image: imageField("Image", "Choose the event card image."),
    imageAlt: textField(
      "Alternative Text",
      "Describe the image for accessibility.",
    ),
    imagePosition: imagePositionField,
    category: textField("Category", "Enter the short event category."),
    title: textField("Title", "Enter the event card title."),
    description: multiline("Description", "Enter the event card summary."),
    detail: textField("Detail", "Enter the short event details."),
    href: optionalText("Page Link", "Enter the private event page path."),
  },
  {
    label: "Private Event Card",
    description: "A private event card shown on the site.",
  },
);

const galleryImageFields = fields.object(
  {
    src: imageField(),
    alt: textField("Alternative Text", "Describe the image for accessibility."),
    position: optionalText(
      "Image Position",
      "Optional CSS classes for image crop and positioning.",
    ),
  },
  {
    label: "Gallery Image",
    description: "An image displayed in the venue gallery.",
  },
);

const pageSectionFields = fields.object(
  {
    eyebrow: optionalText(
      "Eyebrow",
      "Enter the small heading above this section.",
    ),
    title: textField("Title", "Enter the section heading."),
    accent: optionalText(
      "Accent Text",
      "Enter optional emphasized heading text.",
    ),
    text: multiline("Text", "Enter the section body copy."),
    tags: fields.array(textField("Tag", "Enter a short feature tag."), {
      label: "Feature Tags",
      description: "Add the short feature tags shown in this section.",
      itemLabel: (props) => props.value || "Tag",
    }),
    ctaText: optionalText(
      "Call to Action Text",
      "Enter the optional button label.",
    ),
    image: imageField(),
    imageAlt: textField(
      "Alternative Text",
      "Describe the image for accessibility.",
    ),
    imagePosition: imagePositionField,
    minHeight: optionalText(
      "Minimum Height",
      "Optional CSS class that controls section height.",
    ),
  },
  {
    label: "Page Section",
    description: "A content section on the venue page.",
  },
);

const processFields = fields.object(
  {
    eyebrow: textField("Eyebrow", "Enter the small heading above the process."),
    title: textField("Title", "Enter the process heading."),
    steps: fields.array(
      fields.object(
        {
          number: textField("Step Number", "Enter the displayed step number."),
          title: textField("Step Title", "Enter the step heading."),
          text: multiline("Step Text", "Explain this step."),
        },
        {
          label: "Process Step",
          description: "One step in the private event process.",
        },
      ),
      {
        label: "Steps",
        description: "Explain how the private event planning process works.",
        itemLabel: (props) => props.fields.title.value || "Process Step",
      },
    ),
  },
  {
    label: "Planning Process",
    description: "The private event planning steps.",
  },
);

const finalCtaFields = fields.object(
  {
    eyebrow: textField(
      "Eyebrow",
      "Enter the small heading above the call to action.",
    ),
    title: textField("Title", "Enter the call-to-action heading."),
    detail: optionalText("Detail", "Enter optional supporting details."),
    primaryCtaText: textField(
      "Primary Button Text",
      "Enter the primary button label.",
    ),
    secondaryCtaText: textField(
      "Secondary Button Text",
      "Enter the secondary button label.",
    ),
    tertiaryCtaText: optionalText(
      "Tertiary Link Text",
      "Enter the optional third link label.",
    ),
  },
  {
    label: "Final Call to Action",
    description: "The closing call-to-action section.",
  },
);

const privateEventSectionFields = fields.object(
  {
    eyebrow: optionalText(
      "Eyebrow",
      "Enter the small heading above this section.",
    ),
    title: textField("Title", "Enter the section heading."),
    accent: optionalText(
      "Accent Text",
      "Enter optional emphasized heading text.",
    ),
    features: fields.array(textField("Feature", "Enter one event feature."), {
      label: "Features",
      description: "List the event features shown in this section.",
      itemLabel: (props) => props.value || "Feature",
    }),
    text: textList("Paragraphs", "Add the body paragraphs for this section."),
    primaryCtaText: optionalText(
      "Primary Button Text",
      "Enter the optional primary button label.",
    ),
    secondaryCtaText: optionalText(
      "Secondary Button Text",
      "Enter the optional secondary button label.",
    ),
    image: sharedPhotoPathField(),
    imageAlt: textField(
      "Alternative Text",
      "Describe the image for accessibility.",
    ),
    imagePosition: imagePositionField,
    gradientDirection: optionalText(
      "Gradient Direction",
      "Optional direction used by the image overlay gradient.",
    ),
    minHeight: optionalText(
      "Minimum Height",
      "Optional CSS class that controls section height.",
    ),
  },
  {
    label: "Event Section",
    description: "A content section on this private event page.",
  },
);

export default config({
  storage: {
    kind: "cloud",
  },
  cloud: {
    project: "gph-websites/cococabana",
  },
  ui: {
    brand: {
      name: "Cococabana CMS",
    },
    navigation: {
      Website: [
        "homePage",
        "venuePage",
        "menuPage",
        "brunchPage",
        "privateEventsPage",
        "faqPage",
        "contactPage",
      ],
      "Private Events": ["privateEventPages"],
      Blog: ["blog"],
      "Site Settings": [
        "venueData",
        "siteSettings",
        "navigation",
        "footer",
        "menuData",
        "brunchData",
        "privateEventsData",
        "faqData",
      ],
    },
  },
  singletons: {
    venueData: singleton({
      label: "Venue / Business Data",
      path: "src/content/data/venue",
      format: { data: "json" },
      schema: {
        name: textField("Short Name", "Enter the short business name."),
        url: textField("Website URL", "Enter the canonical website URL."),
        fullName: textField("Full Name", "Enter the full business name."),
        wordmark: textField("Wordmark", "Enter the text used in the wordmark."),
        tagline: textField("Tagline", "Enter the short business tagline."),
        hotel: textField(
          "Hotel / Building",
          "Enter the building where Cococabana is located.",
        ),
        address: fields.object(
          {
            street: textField("Street Address"),
            city: textField("City"),
            state: textField("State"),
            zip: textField("ZIP Code"),
          },
          { label: "Address", description: "The venue street address." },
        ),
        phone: textField("Phone Number", "Enter the displayed phone number."),
        phoneHref: textField(
          "Phone Link",
          "Enter the telephone link, including tel:.",
        ),
        social: fields.object(
          {
            instagram: fields.url({
              label: "Instagram URL",
              description: "Enter the full Instagram profile URL.",
            }),
            instagramHandle: textField(
              "Instagram Handle",
              "Enter the displayed Instagram handle.",
            ),
          },
          {
            label: "Social Media",
            description: "The venue social media account.",
          },
        ),
        reservationsUrl: fields.url({
          label: "Reservations URL",
          description: "Enter the full online reservations URL.",
        }),
        orderUrl: fields.url({
          label: "Online Ordering URL",
          description: "Enter the full online ordering URL.",
        }),
        coordinates: fields.object(
          {
            latitude: fields.number({
              label: "Latitude",
              description: "Enter the venue latitude.",
            }),
            longitude: fields.number({
              label: "Longitude",
              description: "Enter the venue longitude.",
            }),
          },
          {
            label: "Map Coordinates",
            description: "Coordinates used for maps and structured data.",
          },
        ),
        schemaHours: fields.array(
          fields.object(
            {
              dayOfWeek: textField("Day of Week"),
              opens: textField("Opening Time", "Use 24-hour HH:MM format."),
              closes: textField("Closing Time", "Use 24-hour HH:MM format."),
            },
            {
              label: "Structured Hours",
              description: "Hours used in search engine data.",
            },
          ),
          {
            label: "Structured Hours",
            description: "Set opening hours used by search engines.",
            itemLabel: (props) => props.fields.dayOfWeek.value || "Day",
          },
        ),
        mapsUrl: fields.url({
          label: "Google Maps URL",
          description: "Enter the public Google Maps link.",
        }),
        mapsEmbedUrl: fields.url({
          label: "Google Maps Embed URL",
          description: "Enter the URL used by the embedded map.",
        }),
        hours: fields.object(
          {
            schedule: fields.array(
              fields.object(
                {
                  days: textField(
                    "Days",
                    "Enter the displayed day or day range.",
                  ),
                  hours: textField(
                    "Hours",
                    "Enter the displayed opening hours.",
                  ),
                },
                {
                  label: "Hours Row",
                  description: "One row in the displayed hours schedule.",
                },
              ),
              {
                label: "Displayed Hours",
                description: "Set the hours shown to site visitors.",
                itemLabel: (props) => props.fields.days.value || "Hours Row",
              },
            ),
            shortSummary: textField(
              "Short Hours Summary",
              "Enter the compact hours summary.",
            ),
          },
          {
            label: "Business Hours",
            description: "Hours displayed throughout the website.",
          },
        ),
        brunch: fields.object(
          {
            days: textField("Brunch Days"),
            hours: textField("Brunch Hours"),
            highlight: textField("Brunch Highlight"),
          },
          {
            label: "Brunch Details",
            description: "The recurring brunch schedule and highlight.",
          },
        ),
        djNights: fields.object(
          {
            days: textField("DJ Days"),
            label: textField("DJ Label"),
          },
          {
            label: "DJ Nights",
            description: "The recurring live DJ schedule.",
          },
        ),
        routes: fields.object(
          {
            privateEvents: textField("Private Events Route"),
            privateEventsBirthday: textField("Birthday Events Route"),
            privateEventsCelebrations: textField("Celebrations Route"),
            privateEventsCorporate: textField("Corporate Events Route"),
            privateEventsRehearsal: textField("Rehearsal Dinners Route"),
            menu: textField("Menu Route"),
            venue: textField("Venue Route"),
            brunch: textField("Brunch Route"),
            faq: textField("FAQ Route"),
            contact: textField("Contact Route"),
            blog: textField("Blog Route"),
          },
          {
            label: "Website Routes",
            description: "Internal page paths used across the website.",
          },
        ),
      },
    }),

    menuData: singleton({
      label: "Menu Data",
      path: "src/content/data/menu",
      format: { data: "json" },
      schema: {
        menuSections: fields.array(
          fields.object(
            {
              id: textField(
                "Section ID",
                "Enter the unique section identifier.",
              ),
              heading: textField("Heading", "Enter the section heading."),
              category: textField("Category", "Enter food or drinks."),
              tone: textField("Color Theme", "Enter light or dark."),
              items: fields.array(menuItemFields, {
                label: "Menu Items",
                description: "Add the food or drink items in this section.",
                itemLabel: (props) => props.fields.name.value || "Menu Item",
              }),
            },
            {
              label: "Menu Section",
              description: "A grouped section of menu items.",
            },
          ),
          {
            label: "Menu Sections",
            description: "Manage the food and cocktail menu sections.",
            itemLabel: (props) => props.fields.heading.value || "Menu Section",
          },
        ),
      },
    }),

    brunchData: singleton({
      label: "Brunch Data",
      path: "src/content/data/brunch",
      format: { data: "json" },
      schema: {
        brunchFood: fields.array(brunchItemFields, {
          label: "Brunch Food",
          description: "Manage the brunch food items.",
          itemLabel: (props) => props.fields.name.value || "Brunch Food Item",
        }),
        brunchDrinks: fields.array(brunchItemFields, {
          label: "Brunch Drinks",
          description: "Manage the brunch drink items.",
          itemLabel: (props) => props.fields.name.value || "Brunch Drink",
        }),
      },
    }),

    privateEventsData: singleton({
      label: "Private Events Cards",
      path: "src/content/data/events",
      format: { data: "json" },
      schema: {
        privateEvents: fields.array(eventCardFields, {
          label: "Private Event Cards",
          description:
            "Manage the event cards shown on the private events landing page.",
          itemLabel: (props) => props.fields.title.value || "Private Event",
        }),
      },
    }),

    faqData: singleton({
      label: "FAQ Data",
      path: "src/content/data/faqs",
      format: { data: "json" },
      schema: {
        faqs: fields.array(
          fields.object(
            {
              id: textField("ID", "Enter the unique question identifier."),
              question: textField(
                "Question",
                "Enter the frequently asked question.",
              ),
              answer: multiline(
                "Answer",
                "Enter the answer shown to visitors.",
              ),
            },
            {
              label: "FAQ",
              description: "A frequently asked question and answer.",
            },
          ),
          {
            label: "Frequently Asked Questions",
            description:
              "Manage the questions and answers shown on the FAQ page.",
            itemLabel: (props) => props.fields.question.value || "FAQ",
          },
        ),
      },
    }),

    siteSettings: singleton({
      label: "Site Settings",
      path: "src/content/site/settings",
      format: { data: "json" },
      schema: {
        businessName: textField("Business Name"),
        phone: textField("Phone Number"),
        email: optionalText("Email Address"),
        address: textField("Address"),
        instagramUrl: fields.url({
          label: "Instagram URL",
          description: "Enter the full Instagram profile URL.",
          validation: { isRequired: false },
        }),
      },
    }),

    navigation: singleton({
      label: "Navigation",
      path: "src/content/site/navigation",
      format: { data: "json" },
      schema: {
        links: fields.array(linkFields, {
          label: "Navigation Links",
          description: "Manage the primary website navigation links.",
          itemLabel: (props) => props.fields.label.value || "Navigation Link",
        }),
        orderLabel: textField(
          "Order Label",
          "Enter the short desktop ordering label.",
        ),
        orderOnlineLabel: textField(
          "Order Online Label",
          "Enter the full online ordering button label.",
        ),
        reserveLabel: textField(
          "Reserve Label",
          "Enter the reservations button label.",
        ),
        mobileMenuLabel: textField(
          "Mobile Menu Label",
          "Enter the mobile menu button label.",
        ),
      },
    }),

    footer: singleton({
      label: "Footer",
      path: "src/content/site/footer",
      format: { data: "json" },
      schema: {
        description: multiline(
          "Description",
          "Enter the short venue description in the footer.",
        ),
        exploreHeading: textField(
          "Explore Heading",
          "Enter the heading above footer links.",
        ),
        exploreLinks: fields.array(linkFields, {
          label: "Explore Links",
          description: "Manage the navigation links shown in the footer.",
          itemLabel: (props) => props.fields.label.value || "Footer Link",
        }),
        visitHeading: textField(
          "Visit Heading",
          "Enter the heading above venue details.",
        ),
        reserveHeading: textField(
          "Reserve Heading",
          "Enter the reservations section heading.",
        ),
        reserveCtaLabel: textField(
          "Reservation Button Label",
          "Enter the reservation button text.",
        ),
        hospitalityLabel: textField(
          "Hospitality Group Label",
          "Enter the hospitality group name.",
        ),
        copyrightSuffix: textField(
          "Copyright Text",
          "Enter the text after the copyright year.",
        ),
        agencyLabel: textField(
          "Agency Label",
          "Enter the website agency credit.",
        ),
        agencyUrl: fields.url({
          label: "Agency URL",
          description: "Enter the full URL for the website agency.",
        }),
      },
    }),

    homePage: singleton({
      label: "Home",
      path: "src/content/pages/home",
      format: { data: "json" },
      schema: {
        seoTitle: textField(
          "SEO Title",
          "Enter the browser and search result title.",
        ),
        seoDescription: multiline(
          "SEO Description",
          "Enter the search result description.",
        ),
        heroEyebrow: textField(
          "Hero Eyebrow",
          "Enter the small heading above the hero title.",
        ),
        heroTitle: textField("Hero Title", "Enter the main page heading."),
        heroText: multiline("Hero Text", "Enter the hero supporting copy."),
        heroSubtitle: optionalText(
          "Hero Subtitle",
          "Enter optional additional hero copy.",
        ),
        primaryCtaText: textField(
          "Primary Button Text",
          "Enter the primary hero button label.",
        ),
        primaryCtaHref: textField(
          "Primary Button Link",
          "Enter the primary hero destination.",
        ),
        secondaryCtaText: textField(
          "Secondary Button Text",
          "Enter the secondary hero button label.",
        ),
        secondaryCtaHref: textField(
          "Secondary Button Link",
          "Enter the secondary hero destination.",
        ),
        heroImage: fields.object(imageObjectFields, {
          label: "Hero Image",
          description: "The main image displayed at the top of the home page.",
        }),
        stats: fields.array(statFields, {
          label: "Statistics",
          description: "Manage the quick facts shown below the hero.",
          itemLabel: (props) => props.fields.label.value || "Statistic",
        }),
        welcome: fields.object(
          {
            image: imageField(),
            imageAlt: textField(
              "Alternative Text",
              "Describe the image for accessibility.",
            ),
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            accent: textField("Accent Text"),
            text: multiline("Text"),
            primaryCtaText: textField("Primary Button Text"),
            secondaryCtaText: textField("Secondary Button Text"),
          },
          {
            label: "Welcome Section",
            description: "The introductory venue section.",
          },
        ),
        bar: fields.object(
          {
            image: imageField(),
            imageAlt: textField(
              "Alternative Text",
              "Describe the image for accessibility.",
            ),
            imagePosition: imagePositionField,
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            accent: textField("Accent Text"),
            text: multiline("Text"),
            primaryCtaText: textField("Primary Button Text"),
            secondaryCtaText: textField("Secondary Button Text"),
          },
          {
            label: "Bar Section",
            description: "The rooftop bar feature section.",
          },
        ),
        food: fields.object(
          {
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            ctaText: textField("Button Text"),
          },
          { label: "Food Section", description: "The food menu introduction." },
        ),
        cocktails: fields.object(
          {
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            ctaText: textField("Button Text"),
          },
          {
            label: "Cocktails Section",
            description: "The cocktail menu introduction.",
          },
        ),
        brunch: fields.object(
          {
            image: imageField(),
            imageAlt: textField(
              "Alternative Text",
              "Describe the image for accessibility.",
            ),
            imagePosition: imagePositionField,
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            primaryCtaText: textField("Primary Button Text"),
            secondaryCtaText: textField("Secondary Button Text"),
          },
          {
            label: "Brunch Section",
            description: "The weekend brunch feature section.",
          },
        ),
        view: fields.object(
          {
            image: imageField(),
            imageAlt: textField(
              "Alternative Text",
              "Describe the image for accessibility.",
            ),
            imagePosition: imagePositionField,
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            accent: textField("Accent Text"),
            text: multiline("Text"),
            ctaText: textField("Button Text"),
          },
          {
            label: "View Section",
            description: "The rooftop view feature section.",
          },
        ),
        cabana: fields.object(
          {
            image: imageField(),
            imageAlt: textField(
              "Alternative Text",
              "Describe the image for accessibility.",
            ),
            imagePosition: imagePositionField,
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            accent: textField("Accent Text"),
            text: multiline("Text"),
            ctaText: textField("Button Text"),
          },
          {
            label: "Cabana Section",
            description: "The cabana seating feature section.",
          },
        ),
        liveMusic: fields.object(
          {
            image: imageField(),
            imageAlt: textField(
              "Alternative Text",
              "Describe the image for accessibility.",
            ),
            imagePosition: imagePositionField,
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            accent: textField("Accent Text"),
            text: multiline("Text"),
            ctaText: textField("Button Text"),
          },
          {
            label: "Live Music Section",
            description: "The DJ and live events feature section.",
          },
        ),
        atmosphere: fields.object(
          {
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            gallery: fields.array(
              fields.object(
                {
                  src: imageField(),
                  alt: textField(
                    "Alternative Text",
                    "Describe the image for accessibility.",
                  ),
                  class: optionalText(
                    "Image Classes",
                    "CSS classes for image crop and positioning.",
                  ),
                },
                {
                  label: "Gallery Image",
                  description: "An atmosphere gallery image.",
                },
              ),
              {
                label: "Gallery Images",
                description: "Manage the atmosphere image gallery.",
                itemLabel: (props) => props.fields.alt.value || "Gallery Image",
              },
            ),
          },
          {
            label: "Atmosphere Section",
            description: "The home page image gallery.",
          },
        ),
        privateEvents: fields.object(
          {
            image: imageField(),
            imageAlt: textField(
              "Alternative Text",
              "Describe the image for accessibility.",
            ),
            imagePosition: imagePositionField,
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            accent: textField("Accent Text"),
            text: multiline("Text"),
            features: fields.array(textField("Event Type"), {
              label: "Event Types",
              description: "List the featured private event types.",
              itemLabel: (props) => props.value || "Event Type",
            }),
            ctaText: textField("Button Text"),
          },
          {
            label: "Private Events Section",
            description: "The private events feature section.",
          },
        ),
        visit: fields.object(
          {
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            accent: textField("Accent Text"),
            addressLabel: textField("Address Label"),
            callLabel: textField("Call Label"),
            hoursLabel: textField("Hours Label"),
            reserveCtaText: textField("Reservation Button Text"),
            directionsCtaText: textField("Directions Button Text"),
            faqCtaText: textField("FAQ Link Text"),
          },
          {
            label: "Visit Section",
            description: "The venue location and contact section.",
          },
        ),
        reserve: fields.object(
          {
            title: textField("Title"),
            accent: textField("Accent Text"),
            ctaText: textField("Button Text"),
          },
          {
            label: "Reservation Section",
            description: "The closing reservation call to action.",
          },
        ),
      },
    }),

    venuePage: singleton({
      label: "Venue",
      path: "src/content/pages/venue",
      format: { data: "json" },
      schema: {
        seoTitle: textField("SEO Title"),
        seoDescription: multiline("SEO Description"),
        heroEyebrow: optionalText("Hero Eyebrow"),
        heroTitle: textField("Hero Title"),
        heroText: multiline("Hero Text"),
        primaryCtaText: optionalText("Primary Button Text"),
        secondaryCtaText: optionalText("Secondary Button Text"),
        heroImage: fields.object(imageObjectFields, {
          label: "Hero Image",
          description: "The main image displayed at the top of the venue page.",
        }),
        stats: fields.array(statFields, {
          label: "Statistics",
          description: "Manage the venue quick facts.",
          itemLabel: (props) => props.fields.label.value || "Statistic",
        }),
        sections: fields.array(pageSectionFields, {
          label: "Sections",
          description: "Manage the main venue page sections.",
          itemLabel: (props) => props.fields.title.value || "Page Section",
        }),
        gallery: fields.object(
          {
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            images: fields.array(galleryImageFields, {
              label: "Images",
              description: "Manage the venue gallery images.",
              itemLabel: (props) => props.fields.alt.value || "Gallery Image",
            }),
          },
          { label: "Gallery", description: "The venue atmosphere gallery." },
        ),
        finalCta: finalCtaFields,
      },
    }),

    menuPage: singleton({
      label: "Menu",
      path: "src/content/pages/menu",
      format: { data: "json" },
      schema: {
        seoTitle: textField("SEO Title"),
        seoDescription: multiline("SEO Description"),
        heroEyebrow: optionalText("Hero Eyebrow"),
        heroTitle: textField("Hero Title"),
        heroText: multiline("Hero Text"),
        primaryCtaText: optionalText("Primary Button Text"),
        heroImage: fields.object(imageObjectFields, {
          label: "Hero Image",
          description: "The main image displayed at the top of the menu page.",
        }),
        sections: fields.array(
          fields.object(
            {
              eyebrow: textField("Eyebrow"),
              title: textField("Title"),
              text: multiline("Text"),
              ctaText: optionalText("Button Text"),
            },
            {
              label: "Menu Section",
              description: "An introduction for a menu category.",
            },
          ),
          {
            label: "Sections",
            description: "Manage the menu category introductions.",
            itemLabel: (props) => props.fields.title.value || "Menu Section",
          },
        ),
        brunchPromo: fields.object(
          {
            image: imageField(),
            imageAlt: textField(
              "Alternative Text",
              "Describe the image for accessibility.",
            ),
            imagePosition: imagePositionField,
            minHeight: optionalText(
              "Minimum Height",
              "Optional CSS class that controls section height.",
            ),
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            primaryCtaText: textField("Primary Button Text"),
            secondaryCtaText: textField("Secondary Button Text"),
          },
          {
            label: "Brunch Promotion",
            description: "The brunch feature on the menu page.",
          },
        ),
        reserve: fields.object(
          {
            title: textField("Title"),
            accent: textField("Accent Text"),
            primaryCtaText: textField("Primary Button Text"),
            secondaryCtaText: textField("Secondary Button Text"),
          },
          {
            label: "Reservation Section",
            description: "The closing reservation call to action.",
          },
        ),
      },
    }),

    brunchPage: singleton({
      label: "Brunch",
      path: "src/content/pages/brunch",
      format: { data: "json" },
      schema: {
        seoTitle: textField("SEO Title"),
        seoDescription: multiline("SEO Description"),
        heroEyebrow: optionalText("Hero Eyebrow"),
        heroTitle: textField("Hero Title"),
        heroText: multiline("Hero Text"),
        heroSubtitle: optionalText("Hero Subtitle"),
        primaryCtaText: optionalText("Primary Button Text"),
        secondaryCtaText: optionalText("Secondary Button Text"),
        secondaryCtaHref: optionalText("Secondary Button Link"),
        heroImage: fields.object(imageObjectFields, {
          label: "Hero Image",
          description:
            "The main image displayed at the top of the brunch page.",
        }),
        stats: fields.array(statFields, {
          label: "Statistics",
          description: "Manage the brunch quick facts.",
          itemLabel: (props) => props.fields.label.value || "Statistic",
        }),
        sections: fields.array(
          fields.object(
            {
              eyebrow: textField("Eyebrow"),
              title: textField("Title"),
              detail: textField("Detail"),
              drinksEyebrow: textField("Drinks Eyebrow"),
              drinksTitle: textField("Drinks Title"),
            },
            {
              label: "Brunch Menu Section",
              description: "The brunch menu heading and schedule.",
            },
          ),
          {
            label: "Sections",
            description: "Manage the brunch menu section headings.",
            itemLabel: (props) => props.fields.title.value || "Brunch Section",
          },
        ),
        mimosaPromo: fields.object(
          {
            image: imageField(),
            imageAlt: textField(
              "Alternative Text",
              "Describe the image for accessibility.",
            ),
            imagePosition: imagePositionField,
            minHeight: optionalText(
              "Minimum Height",
              "Optional CSS class that controls section height.",
            ),
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            accent: textField("Accent Text"),
            text: multiline("Text"),
            ctaText: textField("Button Text"),
          },
          {
            label: "Mimosa Promotion",
            description: "The mimosa feature section.",
          },
        ),
        rooftopPromo: fields.object(
          {
            image: imageField(),
            imageAlt: textField(
              "Alternative Text",
              "Describe the image for accessibility.",
            ),
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            accent: textField("Accent Text"),
            text: multiline("Text"),
            ctaText: textField("Button Text"),
          },
          {
            label: "Rooftop Promotion",
            description: "The rooftop brunch feature section.",
          },
        ),
        reserve: fields.object(
          {
            title: textField("Title"),
            accent: textField("Accent Text"),
            detail: textField("Detail"),
            primaryCtaText: textField("Primary Button Text"),
            secondaryCtaText: textField("Secondary Button Text"),
          },
          {
            label: "Reservation Section",
            description: "The closing brunch reservation section.",
          },
        ),
      },
    }),

    privateEventsPage: singleton({
      label: "Private Events Landing",
      path: "src/content/pages/private-events",
      format: { data: "json" },
      schema: {
        seoTitle: textField("SEO Title"),
        seoDescription: multiline("SEO Description"),
        heroEyebrow: optionalText("Hero Eyebrow"),
        heroTitle: textField("Hero Title"),
        heroText: multiline("Hero Text"),
        primaryCtaText: optionalText("Primary Button Text"),
        primaryCtaHref: optionalText("Primary Button Link"),
        secondaryCtaText: optionalText("Secondary Button Text"),
        secondaryCtaHref: optionalText("Secondary Button Link"),
        heroImage: fields.object(imageObjectFields, {
          label: "Hero Image",
          description:
            "The main image displayed at the top of the private events page.",
        }),
        stats: fields.array(statFields, {
          label: "Statistics",
          description: "Manage the private events quick facts.",
          itemLabel: (props) => props.fields.label.value || "Statistic",
        }),
        eventTypes: fields.array(
          fields.object(
            {
              title: textField("Event Type"),
              description: multiline("Description"),
              href: textField("Page Link"),
            },
            {
              label: "Event Type",
              description: "A private event type and its page link.",
            },
          ),
          {
            label: "Event Types",
            description: "Manage the event types shown on the landing page.",
            itemLabel: (props) => props.fields.title.value || "Event Type",
          },
        ),
        whatWeHost: fields.object(
          {
            image: imageField(),
            imageAlt: textField(
              "Alternative Text",
              "Describe the image for accessibility.",
            ),
            imagePosition: imagePositionField,
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            text: multiline("Text"),
            ctaText: textField("Button Text"),
          },
          { label: "What We Host", description: "The event overview section." },
        ),
        eventGrid: fields.object(
          {
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
          },
          {
            label: "Event Grid Heading",
            description: "The heading above the event cards.",
          },
        ),
        setting: fields.object(
          {
            image: imageField(),
            imageAlt: textField(
              "Alternative Text",
              "Describe the image for accessibility.",
            ),
            imagePosition: imagePositionField,
            gradientDirection: optionalText("Gradient Direction"),
            minHeight: optionalText("Minimum Height"),
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            accent: textField("Accent Text"),
            text: multiline("Text"),
            ctaText: textField("Button Text"),
          },
          {
            label: "Setting Section",
            description: "The rooftop setting feature section.",
          },
        ),
        process: processFields,
        finalCta: fields.object(
          {
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
            detail: textField("Detail"),
            primaryCtaText: textField("Primary Button Text"),
            secondaryCtaText: textField("Secondary Button Text"),
          },
          {
            label: "Final Call to Action",
            description: "The closing contact call to action.",
          },
        ),
      },
    }),

    faqPage: singleton({
      label: "FAQ",
      path: "src/content/pages/faq",
      format: { data: "json" },
      schema: {
        seoTitle: textField("SEO Title"),
        seoDescription: multiline("SEO Description"),
        heroEyebrow: optionalText("Hero Eyebrow"),
        heroTitle: textField("Hero Title"),
        heroText: optionalMultiline("Hero Text"),
        primaryCtaText: optionalText("Primary Button Text"),
        heroImage: fields.object(
          {
            src: imageField(),
            alt: textField(
              "Alternative Text",
              "Describe the image for accessibility.",
            ),
          },
          {
            label: "Hero Image",
            description: "The main image displayed at the top of the FAQ page.",
          },
        ),
        faqs: fields.array(
          fields.object(
            {
              question: optionalText("Question"),
              answer: optionalMultiline("Answer"),
            },
            {
              label: "FAQ",
              description: "A page-specific question and answer.",
            },
          ),
          {
            label: "Page FAQs",
            description: "Optional questions stored with this page.",
            itemLabel: (props) => props.fields.question.value || "FAQ",
          },
        ),
        finalCta: finalCtaFields,
      },
    }),

    contactPage: singleton({
      label: "Contact",
      path: "src/content/pages/contact",
      format: { data: "json" },
      schema: {
        seoTitle: textField("SEO Title"),
        seoDescription: multiline("SEO Description"),
        heroEyebrow: optionalText("Hero Eyebrow"),
        heroTitle: textField("Hero Title"),
        heroText: multiline("Hero Text"),
        primaryCtaText: optionalText("Primary Button Text"),
        heroImage: fields.object(
          {
            src: imageField(),
            alt: textField(
              "Alternative Text",
              "Describe the image for accessibility.",
            ),
          },
          {
            label: "Hero Image",
            description:
              "The main image displayed at the top of the contact page.",
          },
        ),
        formIntro: multiline(
          "Form Introduction",
          "Enter the introduction above the contact form.",
        ),
        cards: fields.array(
          fields.object(
            {
              eyebrow: textField("Eyebrow"),
              title: textField("Title"),
              text: optionalMultiline("Text"),
              primaryCtaText: optionalText("Primary Button Text"),
              secondaryCtaText: optionalText("Secondary Button Text"),
              directionsCtaText: optionalText("Directions Button Text"),
            },
            {
              label: "Contact Card",
              description: "A contact option shown on the page.",
            },
          ),
          {
            label: "Contact Cards",
            description: "Manage the contact option cards.",
            itemLabel: (props) => props.fields.title.value || "Contact Card",
          },
        ),
        hours: fields.object(
          {
            eyebrow: textField("Eyebrow"),
            title: textField("Title"),
          },
          {
            label: "Hours Section",
            description: "The heading above displayed business hours.",
          },
        ),
        eventForm: fields.object(
          {
            heading: textField("Heading"),
            subheading: multiline("Subheading"),
          },
          {
            label: "Event Form",
            description: "The private event inquiry form introduction.",
          },
        ),
        social: fields.object(
          {
            eyebrow: textField("Eyebrow"),
            text: multiline("Text"),
            primaryCtaText: textField("Primary Button Text"),
            secondaryCtaText: textField("Secondary Button Text"),
          },
          {
            label: "Social Section",
            description: "The Instagram and reservation call to action.",
          },
        ),
      },
    }),
  },

  collections: {
    blog: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/blog/*",
      format: {
        contentField: "content",
      },
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            description: "Enter the blog post title.",
          },
          slug: {
            label: "URL Slug",
            description: "Edit the page URL if needed.",
          },
        }),
        description: multiline("Description", "Enter the blog post summary."),
        date: fields.date({
          label: "Publish Date",
          description: "Choose the blog post publication date.",
        }),
        category: textField("Category", "Enter the blog post category."),
        ogImage: optionalText(
          "Open Graph Image",
          "Enter the optional social sharing image path.",
        ),
        content: fields.markdoc({
          label: "Content",
          description: "Write the blog post content.",
          extension: "md",
        }),
      },
    }),

    privateEventPages: collection({
      label: "Private Event Detail Pages",
      slugField: "title",
      path: "src/content/private-events/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            description: "Enter the private event page title.",
          },
          slug: {
            label: "URL Slug",
            description: "Edit the page URL if needed.",
          },
        }),
        seoTitle: textField("SEO Title"),
        seoDescription: multiline("SEO Description"),
        heroEyebrow: optionalText("Hero Eyebrow"),
        heroTitle: textField("Hero Title"),
        heroText: multiline("Hero Text"),
        primaryCtaText: optionalText("Primary Button Text"),
        primaryCtaHref: optionalText("Primary Button Link"),
        secondaryCtaText: optionalText("Secondary Button Text"),
        heroImage: fields.object(
          {
            ...imageObjectFields,
            src: sharedPhotoPathField(),
          },
          {
            label: "Hero Image",
            description:
              "The main image displayed at the top of this event page.",
          },
        ),
        stats: fields.array(statFields, {
          label: "Statistics",
          description: "Manage the event quick facts.",
          itemLabel: (props) => props.fields.label.value || "Statistic",
        }),
        sections: fields.array(privateEventSectionFields, {
          label: "Sections",
          description: "Manage the main sections on this private event page.",
          itemLabel: (props) => props.fields.title.value || "Event Section",
        }),
        process: processFields,
        finalCta: finalCtaFields,
      },
    }),
  },
});
