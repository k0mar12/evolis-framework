import { Light } from 'three';
import { System, SystemPhase, type ComponentConstructor, type EntityId } from '@/evolis/foundation';
import { SceneNodeComponent, LightComponent } from '@/evolis/common';

export abstract class BaseLightSyncSystem<T extends LightComponent> extends System
{
    /**
     *
     */
    protected abstract lightType: ComponentConstructor;

    /**
     *
     */
    public override readonly order: SystemPhase = SystemPhase.Scene;

    /**
     * 
     * @param id
     * @param node
     * @param component
     */
    protected abstract apply(id: EntityId, node: Light, component: T): void;

    /**
     *
     */
    public update(): void
    {
        this.collection.forEach((id) => {
            const { object } = this.world.getComponent<SceneNodeComponent<Light>>(id, SceneNodeComponent);
            const light = this.world.getComponent<T>(id, this.lightType);

            object.intensity = light.options.intensity
            object.color.setHex(light.options.color)

            this.apply(id, object, light)
        });
    }
}
