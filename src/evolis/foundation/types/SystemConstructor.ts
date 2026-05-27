import { Context, World, System } from '@/evolis/foundation';

export type SystemConstructor = new (context: Context, world: World) => System;
