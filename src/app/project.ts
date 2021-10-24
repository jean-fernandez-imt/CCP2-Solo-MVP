import { Item } from './item';

export interface Project {
  id: string;
  name: string;
  items: Item[];
}