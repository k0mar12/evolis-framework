import type { SystemConstructor } from '../../foundation/types/SystemConstructor';

export type OrderedSystem = {
  constructor: SystemConstructor,
  order: number
};
