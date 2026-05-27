import { Component } from '@/evolis/foundation/core/Component';
import type { Object3D } from 'three';

export class MeshComponent extends Component
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
