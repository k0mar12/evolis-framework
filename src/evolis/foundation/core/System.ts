import { Context } from './Context';
import { World } from './World';

import type { SystemOrder } from '../types/SystemOrder';
import type { Tick } from '../types/Tick';
import type { ComponentConstructor } from '../types/ComponentConstructor';

export abstract class System
{
    /**
     *
     */
    public abstract readonly order: SystemOrder;

    /**
     *
     */
    public abstract readonly components: ComponentConstructor[];

    /**
     * 
     * @param context
     * @param world 
     */
    constructor(
        protected readonly context: Context,
        protected readonly world: World
    )
    {
    }

    /**
     * 
     * @param Tick
     */
    public abstract update(tick: Tick): void;
}
