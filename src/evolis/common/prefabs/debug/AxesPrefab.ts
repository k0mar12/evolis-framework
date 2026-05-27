import { AxesHelper } from 'three';
import { Component, type Prefab } from '@/evolis/foundation';
import { MeshComponent } from '@/evolis/common';

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
    public components(): Component[]
    {
        return [
            new MeshComponent(
                new AxesHelper(this.size)
            )
        ];
    }
}
