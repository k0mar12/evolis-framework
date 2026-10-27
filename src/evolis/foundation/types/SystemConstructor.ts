import { System } from '@/evolis/foundation';

export type SystemConstructor = new (...args: ConstructorParameters<typeof System>) => System;
