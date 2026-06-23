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
    'https://tables.toasttab.com/restaurants/92e5306b-e932-4406-876b-91277626cb5c',

  // Update with the actual Toast online ordering URL when available
  orderUrl:
    'https://order.toasttab.com/online/coco-cabana-408-pier-view-way',

  coordinates: {
    latitude: 33.1956,
    longitude: -117.3795,
  },

  schemaHours: [
    { dayOfWeek: 'Thursday',  opens: '17:00', closes: '22:00' },
    { dayOfWeek: 'Friday',    opens: '11:00', closes: '23:59' },
    { dayOfWeek: 'Saturday',  opens: '10:00', closes: '23:59' },
    { dayOfWeek: 'Sunday',    opens: '10:00', closes: '21:00' },
  ],

  mapsUrl:
    'https://www.google.com/maps/place/?q=408+Pier+View+Way,+Oceanside,+CA+92054',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=408+Pier+View+Way,+Oceanside,+CA+92054&output=embed',

  hours: {
    schedule: [
      { days: 'Monday – Wednesday', hours: 'Closed' },
      { days: 'Thursday', hours: '5:00 PM – 10:00 PM' },
      { days: 'Friday', hours: '11:00 AM – 12:00 AM' },
      { days: 'Saturday', hours: '10:00 AM – 12:00 AM' },
      { days: 'Sunday', hours: '10:00 AM – 9:00 PM' },
    ],
    // Compact fragment for info strip / footer
    shortSummary: 'Thu–Sun · Open for Brunch Sat & Sun',
  },

  brunch: {
    days: 'Saturday & Sunday',
    hours: '10:00 AM – 2:00 PM',
    highlight: 'Bottomless Mimosas · 2-Hour Limit',
  },

  routes: {
    privateEvents: '/private-events',
    menu: '/menu',
    venue: '/venue',
    brunch: '/brunch',
  },
} as const;
