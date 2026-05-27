import { GridHelper } from 'three';
import { SceneNodeComponent } from '@/evolis/common';

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
            new SceneNodeComponent(new GridHelper(this.size, this.size))
        ];
    }
}
