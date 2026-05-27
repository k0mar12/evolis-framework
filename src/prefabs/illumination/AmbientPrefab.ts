import { AmbientLight } from 'three';
import { Component, LightComponent, SceneNodeComponent, type Prefab } from '@/evolis';

export class AmbientPrefab implements Prefab
{
    /**
     * 
     * @returns
     */
    public components(): Component[]
    {
        return [
            new SceneNodeComponent(
                new AmbientLight()
            ),
            new LightComponent()
        ];
    }
}
