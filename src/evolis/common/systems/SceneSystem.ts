import { System } from '../../foundation/core/System';
import { MeshComponent } from '../components/MeshComponent';

import type { Tick } from '../../foundation/types/Tick';
import type { SystemOrder } from '../../foundation/types/SystemOrder';
import type { EntityId } from '../../foundation/types/EntityId';
import type { ComponentConstructor } from '../../foundation/types/ComponentConstructor';

export class SceneSystem extends System
{
    /**
     *
     */
    public readonly order: SystemOrder = 0;

    /**
     *
     * @returns typeof Component[]
     */
    public readonly components: ComponentConstructor[] = [
        MeshComponent
    ];

    // public readonly build: Builder[] = [
    //     with(MeshComponent),
    //     without(SceneAddedComponent)
    // ];

    /**
     * 
     * @param Tick
     */
    public update({ collection }: Tick): void
    {
        collection.each((id: EntityId): void => {
            const mesh = this.world.getComponent<MeshComponent>(id, MeshComponent);

            if (! mesh) {
                return;
            }

            if (! this.context.scene.getObjectById(mesh.object.id)) {
                this.context.scene.add(mesh.object);
            }
        });
    }
}
