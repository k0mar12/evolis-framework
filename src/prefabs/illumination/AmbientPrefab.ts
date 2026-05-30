import { AmbientLight } from 'three';
import { Component, AmbientLightComponent, SceneNodeComponent, type Prefab } from '@/evolis';

export default class AmbientPrefab implements Prefab
{
    /**
     * 
     * @returns
     */
    public components(): Component[]
    {
        return [
            new SceneNodeComponent<AmbientLight>(
                new AmbientLight()
            ),
            new AmbientLightComponent()
        ];
    }
}
