import { System } from '../../foundation/core/System';
import { Filter } from '../../foundation/data/Filter';
import { SystemPhase } from '../../foundation/enums/SystemPhase';
import { MeshComponent } from '../components/MeshComponent';
import { TransformComponent } from '../components/TransformComponent';

export class RenderSystem extends System
{
    /**
     *
     */
    public override readonly order: SystemPhase = SystemPhase.Render;

    /**
     *
     */
    public override readonly filter: Filter = new Filter().with(MeshComponent, TransformComponent);

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
