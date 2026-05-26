import { System } from '../../foundation/core/System';
import { Filter } from '../../foundation/data/Filter';
import { MeshComponent } from '../components/MeshComponent';
import { InSceneComponent } from '../components/tags/InSceneComponent';

import type { SystemOrder } from '../../foundation/types/SystemOrder';

export class SceneSystem extends System
{
    /**
     *
     */
    public readonly order: SystemOrder = 600;

    /**
     *
     */
    public readonly filter: Filter = new Filter().with(MeshComponent).without(InSceneComponent);

    /**
     * 
     * @param Tick
     */
    public update(): void
    {
        this.collection.forEach((id) => {
            const mesh = this.world.getComponent<MeshComponent>(id, MeshComponent);

            this.world.addComponent(id, new InSceneComponent());

            this.context.scene.add(mesh.object);
        });
    }
}
