import { System } from '../../foundation/core/System';
import { MeshComponent } from '../components/MeshComponent';
import { TransformComponent } from '../components/TransformComponent';

import type { Tick } from '../../foundation/types/Tick'
import type { SystemOrder } from '../../foundation/types/SystemOrder'
import type { EntityId } from '../../foundation/types/EntityId';
import type { ComponentConstructor } from '@/evolis/foundation/types/ComponentConstructor';

export class RenderSystem extends System
{
    /**
     *
     */
    public readonly order: SystemOrder = 1;

    /**
     *
     * @returns typeof Component[]
     */
    public readonly components: ComponentConstructor[] = [
        MeshComponent,
        TransformComponent
    ];

    /**
     * 
     * @param Tick
     */
    public update({ collection }: Tick): void
    {
        collection.each((id: EntityId): void => {
            const mesh = this.world.getComponent<MeshComponent>(id, MeshComponent);
            const transform = this.world.getComponent<TransformComponent>(id, TransformComponent);

            if (! mesh || ! mesh.object || ! transform) {
                return;
            }

            mesh.object.position.set(transform.x, transform.y, transform.z);
        });
    }
}
