import { System, SystemPhase, Filter } from '@/evolis/foundation';
import { SceneNodeComponent, ShadowComponent } from '@/evolis/common';

export class ShadowSyncSystem extends System
{
    /**
     *
     */
    public override readonly order: SystemPhase = SystemPhase.Scene;

    /**
     *
     */
    public override readonly filter: Filter = new Filter().with(
        SceneNodeComponent,
        ShadowComponent
    );

    /**
     *
     */
    public update(): void
    {
        this.collection.forEach((id) => {
            const { object } = this.world.getComponent<SceneNodeComponent>(id, SceneNodeComponent);
            const { cast, receive } = this.world.getComponent<ShadowComponent>(id, ShadowComponent);

            object.castShadow = cast;
            object.receiveShadow = receive;
        });
    }
}
