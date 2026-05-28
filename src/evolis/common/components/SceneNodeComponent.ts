import { Component } from '@/evolis/foundation';

import type { Object3D } from 'three';

export class SceneNodeComponent<T extends Object3D = Object3D>extends Component
{
    /**
     * 
     * @param object
     */
    constructor(
        public readonly object: T
    )
    {
        super();
    }
}
