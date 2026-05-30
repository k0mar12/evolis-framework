import {
    World,
    Context,
    Filter,
    SystemPhase,
    type EntityId,
    type Tick,
    type Collection
} from '@/evolis/foundation';

export abstract class System
{
    /**
     *
     */
    public abstract readonly order: SystemPhase;

    /**
     *
     */
    public readonly filter: Filter = new Filter();

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
    protected get collection(): Collection<EntityId>
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
