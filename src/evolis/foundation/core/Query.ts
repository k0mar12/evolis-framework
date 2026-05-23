import { Component } from './Component'
import { Collection } from './Collection';
import { ComponentRegistry } from './ComponentRegister';

import type { EntityId } from '../types/EntityId';
import type { ComponentConstructor } from '../types/ComponentConstructor';

export class Query
{
    /**
     *
     */
    private cache: Map<bigint, Set<EntityId>> = new Map();

    /**
     *
     */
    private entityMask: Map<EntityId, bigint> = new Map();

    /**
     * 
     * @param components
     */
    constructor(
        private components: Map<string, Map<EntityId, Component>>
    )
    {
    }

    /**
     * 
     * @param types
     * @returns 
     */
    private buildMask(types: ComponentConstructor[]): bigint
    {
        return types.reduce((m, t) => m | ComponentRegistry.getBit(t.name), 0n)
    }

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
     * @param types
     * @returns 
     */
    private fetch(types: ComponentConstructor[]): Set<EntityId>
    {
        const result = new Set<EntityId>();
        const first  = this.components.get(types[0].name);

        if (!first) {
            return result;
        }

        first.forEach((_, id): void => {
            const hasAll = types.every(t => this.components.get(t.name)?.has(id));

            if (hasAll) {
                result.add(id);
            }
        })

        return result;
    }

    /**
     * 
     * @param types
     * @returns 
     */
    public find(...types: ComponentConstructor[]): Collection
    {
        const mask = this.buildMask(types);

        if (!this.cache.has(mask)) {
            this.cache.set(mask, this.fetch(types));
        }

        return new Collection(this.cache.get(mask)!);
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

        this.cache.forEach((entities, queryMask): void => {
            const wasMatch = (oldMask & queryMask) === queryMask;
            const isMatch  = (newMask & queryMask) === queryMask;

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

        this.cache.forEach((entities, queryMask): void => {
            if ((mask & queryMask) === queryMask) {
                entities.delete(id);
            }
        })

        this.entityMask.delete(id);
    }
}
