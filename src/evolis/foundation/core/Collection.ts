import type { EntityId } from '../types/EntityId';

export class Collection
{
    /**
     * 
     * @param entities
     */
    constructor(
        private entities: Set<EntityId>
    )
    {
    }

    /**
     *
     */
    public all(): EntityId[]
    {
        return [...this.entities];
    }

    /**
     *
     */
    public first(): EntityId | null
    {
        return this.entities.values().next().value ?? null;
    }

    /**
     * 
     * @param cb
     */
    public each(cb: (id: EntityId) => void): void
    {
        this.entities.forEach(cb);
    }
}
