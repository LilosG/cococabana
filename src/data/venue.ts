// Central source of truth for Coco Cabana venue facts.
// Every component/page should import from here rather than hardcoding
// address, phone, or links. Anything not yet confirmed is marked explicitly.

export const venue = {
  name: 'Coco Cabana',
  fullName: 'Coco Cabana Rooftop Bar',
  wordmark: 'COCOCABANA',
  tagline: 'Rooftop Bar',
  hotel: 'The Brick Hotel',

  address: {
    street: '408 Pier View Way',
    city: 'Oceanside',
    state: 'CA',
    zip: '92054',
  },

  phone: '(858) 304-7725',
  phoneHref: 'tel:+18583047725',

  social: {
    instagram: 'https://www.instagram.com/cococabanaoside/',
    instagramHandle: '@cococabanaoside',
  },

  reservationsUrl:
    'https://tables.toasttab.com/restaurants/92e5306b-e932-4406-876b-91277626cb5c/findTime?toast_sg=0ad2b6f7-a902-4be0-97b4-0532bea5a475&toast_ss=6e5433f4-a2dc-4d75-8c25-8ad93cd2b639&toast_src=website_link&utm_source=undefined&utm_content=home&utm_medium=toast_sites&utm_term=nav&utm_campaign=undefined',

  // Update with the actual Toast online ordering URL when available
  orderUrl:
    'https://cococabanaoside.com/order',

  coordinates: {
    latitude: 33.1956,
    longitude: -117.3795,
  },

  schemaHours: [
    { dayOfWeek: 'Monday',    opens: '15:00', closes: '21:00' },
    { dayOfWeek: 'Tuesday',   opens: '15:00', closes: '21:00' },
    { dayOfWeek: 'Wednesday', opens: '15:00', closes: '21:00' },
    { dayOfWeek: 'Thursday',  opens: '15:00', closes: '22:00' },
    { dayOfWeek: 'Friday',    opens: '15:00', closes: '23:59' },
    { dayOfWeek: 'Saturday',  opens: '10:00', closes: '23:59' },
    { dayOfWeek: 'Sunday',    opens: '10:00', closes: '20:00' },
  ],

  mapsUrl:
    'https://www.google.com/maps/place/?q=408+Pier+View+Way,+Oceanside,+CA+92054',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=408+Pier+View+Way,+Oceanside,+CA+92054&output=embed',

  hours: {
    schedule: [
      { days: 'Monday – Wednesday', hours: '3:00 PM – 9:00 PM' },
      { days: 'Thursday', hours: '3:00 PM – 10:00 PM' },
      { days: 'Friday', hours: '3:00 PM – 12:00 AM' },
      { days: 'Saturday', hours: '10:00 AM – 12:00 AM' },
      { days: 'Sunday', hours: '10:00 AM – 8:00 PM' },
    ],
    // Compact fragment for info strip / footer
    shortSummary: 'Open Daily · Brunch Sat & Sun from 10 AM',
  },

  brunch: {
    days: 'Saturday & Sunday',
    hours: '10:00 AM – 2:00 PM',
    highlight: 'Bottomless Mimosas · 2-Hour Limit',
  },

  djNights: {
    days: 'Fri & Sat',
    label: 'Live Every Weekend',
  },

  routes: {
    privateEvents: '/private-events',
    privateEventsBirthday: '/private-events/birthday-parties',
    privateEventsCelebrations: '/private-events/celebrations',
    privateEventsCorporate: '/private-events/corporate-events',
    privateEventsRehearsal: '/private-events/rehearsal-dinners',
    menu: '/menu',
    venue: '/venue',
    brunch: '/brunch',
    faq: '/faq',
    contact: '/contact',
    blog: '/blog',
  },
} as const;
