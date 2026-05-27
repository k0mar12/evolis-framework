import type { EntityId } from '@/evolis/foundation';

export class Collection extends Set<EntityId>
{
    public first(): EntityId | null
    {
        return this.values().next().value ?? null;
    }
}
