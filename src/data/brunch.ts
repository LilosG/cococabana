import brunchData from '../content/data/brunch.json';

export interface BrunchItemData {
  name: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  description?: string;
}

export const brunchFood = brunchData.brunchFood as BrunchItemData[];
export const brunchDrinks = brunchData.brunchDrinks as BrunchItemData[];
