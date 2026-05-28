import { type DirectionalLight } from 'three';
import { Filter, type ComponentConstructor, type EntityId } from '@/evolis/foundation';
import { DirectionalLightComponent, BaseLightSyncSystem, SceneNodeComponent } from '@/evolis/common';

export class DirectionalLightSyncSystem extends BaseLightSyncSystem<DirectionalLightComponent>
{
    /**
     *
     */
    protected override lightType: ComponentConstructor = DirectionalLightComponent;

    /**
     *
     */
    public override readonly filter: Filter = new Filter().with(
        SceneNodeComponent, this.lightType
    );

    /**
     * 
     * @param id
     * @param node
     * @param component
     */
    protected override apply(id: EntityId, node: DirectionalLight, component: DirectionalLightComponent): void
    {
        // node.castShadow = component.castShadow;
        node.shadow.mapSize.width = component.shadowMapSize;
        node.shadow.mapSize.height = component.shadowMapSize;

        node.shadow.camera.left = -component.shadowCameraSize;
        node.shadow.camera.right = component.shadowCameraSize;
        node.shadow.camera.top = component.shadowCameraSize;
        node.shadow.camera.bottom = -component.shadowCameraSize;

        node.shadow.bias = component.shadowBias;
    }
}
