// Single source of truth for FAQ content.
// Used by both the /faq page template and the FAQPage structured data schema.
// Hours are derived from venue.ts — not hardcoded here.

import { venue } from './venue';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const hoursAnswer = venue.hours.schedule
  .map(s => `${s.days}: ${s.hours}`)
  .join(' · ');

export const faqs: FaqItem[] = [
  {
    id: 'reservations',
    question: 'Do you take reservations?',
    answer:
      'Yes — reservations are available and recommended, especially for weekend brunch. Use the Reserve button on the site.',
  },
  {
    id: 'hours',
    question: 'What are your hours?',
    answer: hoursAnswer,
  },
  {
    id: 'brunch',
    question: 'Is there a weekend brunch?',
    answer:
      'Yes — Saturday and Sunday, 10:00 AM – 2:00 PM, with bottomless mimosas (2-hour limit, while you dine).',
  },
  {
    id: 'music',
    question: 'Do you have live music or DJs?',
    answer: 'Yes — DJ nights every Friday and Saturday.',
  },
  {
    id: 'location',
    question: 'Where is Coco Cabana located?',
    answer: `${venue.address.street}, ${venue.address.city}, ${venue.address.state} ${venue.address.zip} — on the rooftop of ${venue.hotel}, four stories up.`,
  },
  {
    id: 'private-events',
    question: 'Do you host private events?',
    answer:
      'Yes — call to inquire or visit the Private Events page for what we host.',
  },
  {
    id: 'order-online',
    question: 'Can I order food or drinks online?',
    answer: 'Yes — use the Order button on the site.',
  },
  {
    id: 'walk-ins',
    question: 'Do you accept walk-ins?',
    answer: 'Yes — both walk-ins and reservations are welcome.',
  },
  {
    id: 'covered-seating',
    question: 'Is the rooftop covered if it rains?',
    answer:
      'Yes — the rooftop has covered seating areas in addition to open-air seating.',
  },
  {
    id: 'parking',
    question: 'Is parking available?',
    answer:
      `Yes — street parking and nearby parking lots are available around ${venue.hotel}.`,
  },
  {
    id: 'pets',
    question: 'Are pets allowed?',
    answer: 'Yes — Coco Cabana is pet-friendly.',
  },
];
