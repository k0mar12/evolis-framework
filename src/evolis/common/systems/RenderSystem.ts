import { System } from '../../foundation/core/System';
import { Filter } from '../../foundation/data/Filter';
import { MeshComponent } from '../components/MeshComponent';
import { TransformComponent } from '../components/TransformComponent';

import type { SystemOrder } from '../../foundation/types/SystemOrder';

export class RenderSystem extends System
{
    /**
     *
     */
    public readonly order: SystemOrder = 700;

    /**
     *
     */
    public readonly filter: Filter = new Filter().with(MeshComponent, TransformComponent);

    /**
     * 
     * @param Tick
     */
    public update(): void
    {
        this.collection.forEach((id) => {
            const mesh = this.world.getComponent<MeshComponent>(id, MeshComponent);
            const transform = this.world.getComponent<TransformComponent>(id, TransformComponent);

            mesh.object.position.set(transform.x, transform.y, transform.z);
        });
    }
}
