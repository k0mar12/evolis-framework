import { DirectionalLight } from 'three';
import {
    Component,
    DirectionalLightComponent,
    SceneNodeComponent,
    TransformComponent,
    ShadowComponent,
    type Vec3,
    type Prefab,
} from '@/evolis';

export class SunPrefab implements Prefab
{
    /**
     * 
     * @param position
     */
    constructor(
        protected position: Vec3 = { x: 10, y: 20, z: 10 }
    )
    {
    }

    /**
     * 
     * @returns
     */
    public components(): Component[]
    {
        return [
            new SceneNodeComponent<DirectionalLight>(
                new DirectionalLight()
            ),
            new DirectionalLightComponent({ intensity: 0.9, color: 0xffffff }),
            new ShadowComponent({ cast: true }),
            new TransformComponent(this.position)
        ];
    }
}
