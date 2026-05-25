import { Application } from '../core/Application';
import { Component } from '../core/Component';

import type { EntityId } from '../types/EntityId';
import type { ComponentConstructor } from '../types/ComponentConstructor';

export class EntityIterator
{
    public id: EntityId = -1;

    /**
     * 
     * @param type
     * @returns 
     */
    public add(type: ComponentConstructor): void
    {
        Application.get().world.addComponent(this.id, type);
    }

    /**
     * 
     * @param type
     */
    public remove(type: ComponentConstructor): void
    {
        Application.get().world.removeComponent(this.id, type);
    }

    /**
     * 
     */
    public destroy(): void
    {
        Application.get().world.destroyEntity(this.id);
    }

    /**
     * 
     * @param type
     * @returns 
     */
    public get<T extends Component>(type: ComponentConstructor): T
    {
        return Application.get().world.getComponent(this.id, type);
    }
}
