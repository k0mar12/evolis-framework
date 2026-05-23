import { Context } from '../core/Context';
import { World } from '../core/World';
import { System } from '../core/System';

export type SystemConstructor = new (context: Context, world: World) => System;
