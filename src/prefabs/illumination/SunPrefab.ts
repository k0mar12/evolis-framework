import { DirectionalLight } from 'three';
import { Component, SceneNodeComponent, TransformComponent, type Prefab } from '@/evolis';

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
                new DirectionalLight(0xffffff, 1)
            ),
            new TransformComponent(10, 20, 10)
        ];
    }
}
