import { Component } from '../core/Component';
import { Application } from '../core/Application';

import type { EntityId } from '../types/EntityId';
import type { ComponentConstructor } from '../types/ComponentConstructor';

export class Collection extends Set<EntityId>
{
    /**
     * 
     * @param cb
     */
    public each(
        cb: (id: EntityId,
        get: <T extends Component>(type: ComponentConstructor) => T) => void
    ): void
    {
        const get = <T extends Component>(id: EntityId) => (type: ComponentConstructor): T => {
            return Application.get().world.getComponent<T>(id, type);
        };

        this.forEach(id => cb(id, get(id)));
    }
}
