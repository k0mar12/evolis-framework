import { System, Filter, SystemPhase } from '@/evolis/foundation';
import { MeshComponent, TransformComponent } from '@/evolis/common';

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
