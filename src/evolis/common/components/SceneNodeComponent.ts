import { Component } from '@/evolis/foundation';

import type { Object3D } from 'three';

export class SceneNodeComponent extends Component
{
    /**
     * 
     * @param object
     */
    constructor(
        public readonly object: Object3D
    )
    {
        super();
    }
}
