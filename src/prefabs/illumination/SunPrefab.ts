import { DirectionalLight } from 'three';
import {
    Component,
    DirectionalLightComponent,
    SceneNodeComponent,
    TransformComponent,
    type Prefab
} from '@/evolis';

export class SunPrefab implements Prefab
{
    /**
     * 
     * @returns
     */
    public components(): Component[]
    {
        return [
            new SceneNodeComponent(
                new DirectionalLight()
            ),
            new DirectionalLightComponent({ intensity: 0.9, color: 0xffffff }),
            new TransformComponent(5, 20, 0)
        ];
    }
}
