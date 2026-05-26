import { Context } from './Context';
import { World } from './World';
import { Filter } from '../data/Filter';

import type { SystemOrder } from '../types/SystemOrder';
import type { Tick } from '../types/Tick';
import type { Collection } from '../data/Collection';

export abstract class System
{
    /**
     *
     */
    public abstract readonly order: SystemOrder;

    /**
     *
     */
    public abstract readonly filter: Filter;

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
     */
    protected get collection(): Collection
    {
        return this.world.query.find(this.filter);
    }

    /**
     *
     */
    public boot(): void
    {

    }

    /**
     * 
     * @param Tick
     */
    public abstract update(tick: Tick): void;
}
