import {
    World,
    Context,
    Filter,
    SystemPhase,
    SystemUpdateMode,
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
     * Frame updates by default.
     * Simulation systems explicitly opt into fixed ticks.
     *
     */
    public readonly updateMode: SystemUpdateMode = SystemUpdateMode.Frame;

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
