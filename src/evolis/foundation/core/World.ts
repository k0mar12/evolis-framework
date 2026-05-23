import { Component } from './Component';
import { Query } from './Query';
import { ComponentRegistry } from './ComponentRegister';

import type { System } from './System';
import type { EntityId } from '../types/EntityId';
import type { Prefab } from '../contracts/Prefab';
import type { ComponentConstructor } from '../types/ComponentConstructor';

export class World
{
    /**
     *
     */
    public readonly query: Query;

    /**
     *
     */
    protected readonly components: Map<string, Map<number, Component>> = new Map();


    /**
     * 
     */
    protected readonly systems: System[] = [];

    /**
     *
     */
    protected nextEntityId: EntityId = 0;

    /**
     *
     */
    constructor()
    {
        this.query = new Query(this.components);
    }

    /**
     * 
     * @returns
     */
    public getSystems(): System[]
    {
        return this.systems;
    }

    /**
     * 
     * @param system
     */
    public addSystem(system: System): void
    {
        this.systems.push(system);
    }

    /**
     * 
     * @returns
     */
    protected createEntity(): EntityId
    {
        return this.nextEntityId++;
    }

    /**
     * 
     * @param id
     */
    public destroyEntity(id: EntityId): void
    {
        this.components.forEach(storage => storage.delete(id));
        this.query.remove(id);
    }

    /**
     * 
     * @param entity
     */
    public addComponent(id: EntityId, component: Component): void
    {
        const type = component.constructor.name;

        let storage = this.components.get(type);

        if (! storage) {
            storage = new Map();
            this.components.set(type, storage);
        }

        storage.set(id, component);

        const oldMask = this.query.getMask(id);
        const newMask = oldMask | ComponentRegistry.getBit(type);

        this.query.invalidate(id, oldMask, newMask);
    }

    /**
     * 
     * @param id
     * @param type 
     */
    public removeComponent(id: EntityId, type: string): void
    {
        this.components.get(type)?.delete(id);

        const oldMask = this.query.getMask(id);
        const newMask = oldMask & ~ComponentRegistry.getBit(type);

        this.query.invalidate(id, oldMask, newMask);
    }

    /**
     * 
     * @param id
     * @param type 
     * @returns 
     */
    public getComponent<T extends Component>(id: EntityId, type: ComponentConstructor): T | null
    {
        return (this.components.get(type.name)?.get(id) as T) ?? null;
    }

    /**
     * 
     * @param prefabs
     */
    public spawn(...prefabs: Prefab[])
    {
        for (const prefab of prefabs) {
            const entityId = this.createEntity()

            for (const component of prefab.components()) {
                this.addComponent(entityId, component);
            }
        }
    }
}
