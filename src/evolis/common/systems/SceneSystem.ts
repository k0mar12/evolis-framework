import { System, Filter, SystemPhase } from '@/evolis/foundation';
import { SceneNodeComponent, InSceneComponent } from '@/evolis/common';

export class SceneSystem extends System
{
    /**
     *
     */
    public override readonly order: SystemPhase = SystemPhase.Scene;

    /**
     *
     */
    public override readonly filter: Filter = new Filter().with(SceneNodeComponent).without(InSceneComponent);

    /**
     * 
     * @param Tick
     */
    public update(): void
    {
        this.collection.forEach((id) => {
            const mesh = this.world.getComponent<SceneNodeComponent>(id, SceneNodeComponent);

            this.world.addComponent(id, new InSceneComponent());

            this.context.scene.add(mesh.object);
        });
    }
}
