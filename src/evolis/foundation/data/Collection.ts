import type { EntityId } from '../types/EntityId';

export class Collection extends Set<EntityId>
{
    public first(): EntityId | null
    {
        return this.values().next().value ?? null;
    }
}
