import { Item } from './item';

export interface Project {
  id: number;
  name: string;
  items: Item[];
}