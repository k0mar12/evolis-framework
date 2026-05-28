import { System, Filter, SystemPhase } from '@/evolis/foundation';
import { SceneNodeComponent, TransformComponent, RotationComponent } from '@/evolis/common';

export class RenderSystem extends System
{
    /**
     *
     */
    public override readonly order: SystemPhase = SystemPhase.Render;

    /**
     *
     */
    protected readonly transformFilter: Filter = new Filter().with(SceneNodeComponent, TransformComponent);

    /**
     * 
     */
    protected readonly rotationFilter: Filter = new Filter().with(SceneNodeComponent, RotationComponent)

    /**
     * 
     * @param Tick
     */
    public update(): void
    {
        this.world.query.find(this.transformFilter).forEach((id) => {
            const mesh = this.world.getComponent<SceneNodeComponent>(id, SceneNodeComponent);
            const transform = this.world.getComponent<TransformComponent>(id, TransformComponent);

            mesh.object.position.set(transform.x, transform.y, transform.z);
        });

        this.world.query.find(this.rotationFilter).forEach((id) => {
            const mesh = this.world.getComponent<SceneNodeComponent>(id, SceneNodeComponent);
            const rotation = this.world.getComponent<TransformComponent>(id, RotationComponent);

            mesh.object.rotation.set(rotation.x, rotation.y, rotation.z);
        });
    }
}
