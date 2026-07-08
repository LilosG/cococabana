export interface EventData {
  image: string;
  imageAlt: string;
  imagePosition?: string;
  category: string;
  title: string;
  description: string;
  detail: string;
  href?: string;
}

export const privateEvents: EventData[] = [
  {
    image: '/photos/events-crowd-hero.jpg',
    imageAlt: 'Packed Coco Cabana rooftop at golden hour — full venue energy',
    imagePosition: 'object-[center_40%]',
    category: 'Birthdays',
    title: 'Birthday Parties',
    description: "Celebrate above Downtown Oceanside — full bar, rooftop views, and a night your crew won't forget.",
    detail: 'Rooftop · Full Bar · Custom Experience',
    href: '/private-events/birthday-parties',
  },
  {
    image: '/photos/events-rooftop-dining.jpg',
    imageAlt: 'Women dining and celebrating on Coco Cabana rooftop with cocktails and palm views',
    imagePosition: 'object-[center_40%]',
    category: 'Celebrations',
    title: 'Bachelorettes & Celebrations',
    description: 'Caribbean cocktails, cabana seating, and a rooftop setting built for every kind of celebration.',
    detail: 'Bachelorettes · Baby Showers · Milestones',
    href: '/private-events/celebrations',
  },
  {
    image: '/photos/live-music-dj.jpg',
    imageAlt: 'DJ set at Coco Cabana rooftop with crowd and palm trees at golden hour',
    imagePosition: 'object-[center_30%]',
    category: 'Corporate',
    title: 'Corporate & Brand',
    description: 'Client entertainment, team celebrations, and brand activations — a venue that makes the impression for you.',
    detail: 'Custom Packages · Any Weekday',
    href: '/private-events/corporate-events',
  },
  {
    image: '/photos/cabana-lounge-cityview.jpg',
    imageAlt: 'Coco Cabana rooftop lounge with pink daybeds, tile wall, and Oceanside city views at dusk',
    category: 'Dinners',
    title: 'Rehearsal Dinners',
    description: 'A rooftop above Downtown Oceanside sets the tone for the wedding weekend — Caribbean cocktails, open air, and an unforgettable view.',
    detail: 'Rooftop · Full Bar · Call to Inquire',
    href: '/private-events/rehearsal-dinners',
  },
];
