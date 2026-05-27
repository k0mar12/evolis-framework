import type { SystemConstructor } from '@/evolis/foundation';

export type OrderedSystem = {
  constructor: SystemConstructor,
  order: number
};
