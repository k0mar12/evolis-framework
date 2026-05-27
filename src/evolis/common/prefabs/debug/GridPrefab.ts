import { GridHelper } from 'three';
import { MeshComponent } from '@/evolis/common';

import type { Component, Prefab } from '@/evolis/foundation';

export class GridPrefab implements Prefab
{
    /**
     * 
     * @param size
     */
    constructor(
        protected size: number = 300
    )
    {
    }

    /**
     * 
     */
    public components(): Component[]
    {
        return [
            new MeshComponent(new GridHelper(this.size, this.size))
        ];
    }
}
