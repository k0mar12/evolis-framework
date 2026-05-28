import { type AmbientLight } from 'three';
import { Filter, type ComponentConstructor, type EntityId } from '@/evolis/foundation';
import { AmbientLightComponent, BaseLightSyncSystem, SceneNodeComponent } from '@/evolis/common';

export class AmbientLightSyncSystem extends BaseLightSyncSystem<AmbientLightComponent>
{
    /**
     *
     */
    protected override lightType: ComponentConstructor = AmbientLightComponent;

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
    protected override apply(id: EntityId, node: AmbientLight, component: AmbientLightComponent): void
    {
    }
}
