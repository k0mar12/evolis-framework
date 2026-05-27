import { Filter, System, SystemPhase } from '@/evolis/foundation';
import { SceneNodeComponent, LightComponent, DirectionalLightComponent } from '@/evolis/common';

export class LightSyncSystem extends System
{
    /**
     *
     */
    public override readonly order: SystemPhase = SystemPhase.Scene;

    /**
     * 
     */
    public override readonly filter: Filter = new Filter().with(
        SceneNodeComponent
    ).any(
        LightComponent,
        DirectionalLightComponent
    );

    /**
     *
     */
    protected applyDirectionLight()
    {

    }

    /**
     * 
     */
    public update(): void
    {
        this.collection.forEach((id) => {
            const { object } = this.world.getComponent<SceneNodeComponent>(id, SceneNodeComponent);

            const light = this.world.findComponent<LightComponent>(id, LightComponent)
                ?? this.world.findComponent<DirectionalLightComponent>(id, DirectionalLightComponent);

            if (light === null) {
                return;
            }

            object.intensity = light.options.intensity;
            object.color.setHex(light.options.color);

            if (light instanceof DirectionalLightComponent) {
                object.castShadow = light.castShadow;
                object.shadow.mapSize.width = light.shadowMapSize;
                object.shadow.mapSize.height = light.shadowMapSize;

                object.shadow.camera.left = -light.shadowCameraSize;
                object.shadow.camera.right = light.shadowCameraSize;
                object.shadow.camera.top = light.shadowCameraSize;
                object.shadow.camera.bottom = -light.shadowCameraSize;

                object.shadow.bias = light.shadowBias;
            }
        });
    }
}
