import { PhysicsWorld } from './PhysicsWorld';
import {
    Component,
    ComponentRegistry,
    Query,
    type EntityId,
    type Prefab,
    type ComponentConstructor
} from '@/evolis/foundation';

export class World
{
    /**
     *
     * @private
     */
    private readonly entityChangeListeners = new Set<(id: EntityId) => void>();

    /**
     *
     */
    public readonly query: Query = new Query();

    /**
     *
     */
    public readonly physics = new PhysicsWorld();

    /**
     *
     */
    protected readonly components: Map<string, Map<EntityId, Component>> = new Map();

    /**
     *
     */
    protected nextEntityId: EntityId = 0;

    /**
     * Subscribe to component additions, replacements, removals and entity destruction.
     *
     * @param listener
     */
    public onEntityChanged(listener: (id: EntityId) => void): () => void
    {
        this.entityChangeListeners.add(listener);

        return () => {
            this.entityChangeListeners.delete(listener);
        };
    }

    /**
     * Call after editing static physics geometry or transforms in place.
     *
     * @param id
     */
    public markEntityChanged(id: EntityId): void
    {
        for (const listener of this.entityChangeListeners) {
            listener(id);
        }
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
        this.markEntityChanged(id);
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
        this.markEntityChanged(id);
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
        this.markEntityChanged(id);
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
    public async insert(...prefabs: Prefab[]): Promise<void>
    {
        const insertTasks = prefabs.map(async (prefab) => {
            const entityId = this.createEntity();
            const components = await prefab.components();
            for (const component of components) {
                this.addComponent(entityId, component);
            }
        });

        await Promise.all(insertTasks);
    }
}
