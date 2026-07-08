import faqData from '../content/data/faqs.json';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs = faqData.faqs as FaqItem[];
