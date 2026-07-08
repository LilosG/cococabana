import eventsData from '../content/data/events.json';

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

export const privateEvents = eventsData.privateEvents as EventData[];
