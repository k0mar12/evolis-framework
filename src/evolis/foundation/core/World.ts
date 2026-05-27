import {
    Component,
    ComponentRegistry,
    Query,
    type System,
    type EntityId,
    type Prefab,
    type ComponentConstructor
} from '@/evolis/foundation';

import { AxesPrefab, GridPrefab } from '@/evolis/common';

export class World
{
    /**
     *
     */
    public readonly query: Query = new Query();

    /**
     *
     */
    protected readonly components: Map<string, Map<EntityId, Component>> = new Map();

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
        
        system.boot();
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
            storage = new Map<EntityId, Component>();
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
    public removeComponent(id: EntityId, type: ComponentConstructor): void
    {
        this.components.get(type.name)?.delete(id);

        const oldMask = this.query.getMask(id);
        const newMask = oldMask & ~ComponentRegistry.getBit(type.name);

        this.query.invalidate(id, oldMask, newMask);
    }

    /**
     * 
     * @param id
     * @param type 
     * @returns 
     */
    public getComponent<T extends Component>(id: EntityId, type: ComponentConstructor): T
    {
        const storage = this.components.get(type.name)

        if (! storage) {
            throw new Error(`Component ${type.name} is not registered.`);
        }

        const component = storage.get(id);

        if (! component) {
            throw new Error(`Component ${type.name} not found for entity ${id}.`);
        }

        return component as T;
    }

    /**
     * 
     * @param id
     * @param type 
     * @returns 
     */
    public findComponent<T extends Component>(id: EntityId, type: ComponentConstructor): T | null
    {
        return (this.components.get(type.name)?.get(id) as T) ?? null;
    }

    /**
     * 
     * @param prefabs
     */
    public insert(...prefabs: Prefab[])
    {
        for (const prefab of prefabs) {
            const entityId = this.createEntity()

            for (const component of prefab.components()) {
                this.addComponent(entityId, component);
            }
        }
    }
}
