import { AxesHelper } from 'three';
import { Component, type Prefab } from '@/evolis/foundation';
import { SceneNodeComponent } from '@/evolis/common';

export class AxesPrefab implements Prefab
{
    /**
     * 
     * @param size
     */
    constructor(
        protected size: number = 200
    )
    {
    }

    /**
     * 
     */
    public async components(): Promise<Component[]>
    {
        return [
            new SceneNodeComponent(
                new AxesHelper(this.size)
            )
        ];
    }
}
