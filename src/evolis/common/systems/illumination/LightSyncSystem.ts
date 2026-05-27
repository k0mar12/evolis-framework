import { Collection, Filter, System, SystemPhase } from '@/evolis/foundation';
import { SceneNodeComponent, LightComponent } from '@/evolis/common';

export class LightSyncSystem extends System
{
    /**
     *
     */
    public override readonly order: SystemPhase = SystemPhase.Scene;



    /**
     *
     */
    protected get ambients(): Collection
    {
        return this.world.query.find(new Filter().with(SceneNodeComponent, LightComponent));
    }

    /**
     * 
     */
    public update(): void
    {
        this.ambients.forEach((id) => {
            const { object } = this.world.getComponent<SceneNodeComponent>(id, SceneNodeComponent);
            const light = this.world.getComponent<LightComponent>(id, LightComponent);

            object.intensity = light.options.intensity;
            object.color.setHex(light.options.color);
        });
    }
}
