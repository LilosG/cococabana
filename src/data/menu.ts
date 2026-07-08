import menuData from '../content/data/menu.json';

export interface MenuItemData {
  name?: string;
  description?: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
}

export interface MenuSectionData {
  id: string;
  heading: string;
  category: 'food' | 'drinks';
  tone: 'light' | 'dark';
  items: MenuItemData[];
}

export const menuSections = menuData.menuSections as MenuSectionData[];
