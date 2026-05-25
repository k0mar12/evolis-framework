import { Collection } from './Collection';
import { Filter } from './Filter';

import type { EntityId } from '../types/EntityId';

export class Query {
    /**
     *
     */
    private cache: Map<bigint, { entities: Collection, filter: Filter }> = new Map();

    /**
     *
     */
    private entityMask: Map<EntityId, bigint> = new Map();

    /**
     * 
     * @param id
     * @returns 
     */
    public getMask(id: EntityId): bigint
    {
        return this.entityMask.get(id) ?? 0n;
    }

    /**
     * 
     * @param filter
     * @returns 
     */
    public find(filter: Filter): Collection
    {
        const key = filter.cacheKey;

        if (! this.cache.has(key)) {
            this.cache.set(key, { entities: this.fetch(filter), filter });
        }

        return this.cache.get(key)!.entities;
    }

    /**
     * 
     * @param id
     * @param oldMask 
     * @param newMask 
     */
    public invalidate(id: EntityId, oldMask: bigint, newMask: bigint): void
    {
        this.entityMask.set(id, newMask);

        this.cache.forEach(({ entities, filter }): void => {
            const wasMatch = filter.matches(oldMask);
            const isMatch  = filter.matches(newMask);

            if (! wasMatch && isMatch) {
                entities.add(id);
            }

            if (wasMatch && ! isMatch) {
                entities.delete(id);
            }
        })
    }

    /**
     * 
     * @param id
     */
    public remove(id: EntityId): void
    {
        const mask = this.entityMask.get(id) ?? 0n;

        this.cache.forEach(({ entities, filter }): void => {
            if (filter.matches(mask)) {
                entities.delete(id);
            }
        });

        this.entityMask.delete(id);
    }

    /**
     * 
     * @param filter
     * @returns 
     */
    private fetch(filter: Filter): Collection
    {
        const result = new Collection();

        this.entityMask.forEach((mask, id): void => {
            if (filter.matches(mask)) {
                result.add(id);
            }
        });

        return result;
    }
}