export interface EventData {
  image: string;
  imageAlt: string;
  imagePosition?: string;
  category: string;
  title: string;
  description: string;
  detail: string;
}

export const privateEvents: EventData[] = [
  {
    image: '/photos/events-group-lifestyle.jpg',
    imageAlt: 'Group celebrating birthdays at Coco Cabana rooftop with cocktails',
    imagePosition: 'object-[center_40%]',
    category: 'Birthdays',
    title: 'Birthday Parties',
    description: "Celebrate above Downtown Oceanside — full bar, rooftop views, and a night your crew won't forget.",
    detail: 'Rooftop · Full Bar · Custom Experience',
  },
  {
    image: '/photos/events-rooftop-dining.jpg',
    imageAlt: 'Women dining and celebrating on Coco Cabana rooftop with cocktails and palm views',
    imagePosition: 'object-[center_40%]',
    category: 'Celebrations',
    title: 'Bachelorette Parties',
    description: 'Caribbean cocktails, cabana seating, and a rooftop setting that does all the work for you.',
    detail: 'Rooftop · Cocktail Packages Available',
  },
  {
    image: '/photos/brunch-mimosa-flight.jpg',
    imageAlt: 'Campo Viejo cava mimosa flight on marble table with flamingo and tropical plants',
    category: 'Daytime Events',
    title: 'Baby Showers',
    description: 'Bottomless mimosas, brunch plates, and an open-air rooftop for a celebration worth showing up for.',
    detail: 'Sat & Sun · Brunch Hours Available',
  },
  {
    image: '/photos/events-crowd-hero.jpg',
    imageAlt: 'Packed Coco Cabana rooftop at golden hour — full venue energy',
    imagePosition: 'object-[center_40%]',
    category: 'Milestones',
    title: 'Milestone Celebrations',
    description: 'Anniversaries, retirements, graduations — any reason to get the people you love on a rooftop.',
    detail: 'Flexible Configurations · Any Size',
  },
  {
    image: '/photos/events-rooftop-crowd.jpg',
    imageAlt: 'DJ facing the crowd at Coco Cabana rooftop — palms, open sky, packed venue',
    imagePosition: 'object-[center_25%]',
    category: 'After Dark',
    title: 'Live Music Events',
    description: 'Private DJ sets, open bar, and the Oceanside skyline. The rooftop after dark is an experience of its own.',
    detail: 'DJ Available · Fri & Sat Nights',
  },
  {
    image: '/photos/live-music-dj.jpg',
    imageAlt: 'DJ set at Coco Cabana rooftop with crowd and palm trees at golden hour',
    imagePosition: 'object-[center_30%]',
    category: 'Corporate',
    title: 'Corporate & Brand',
    description: 'Client entertainment, team celebrations, and brand activations — a venue that makes the impression for you.',
    detail: 'Custom Packages · Any Weekday',
  },
];
