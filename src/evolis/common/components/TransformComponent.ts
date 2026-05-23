
import { Component } from '../../foundation/core/Component';

export class TransformComponent extends Component
{
    /**
     * 
     * @param x
     * @param y 
     * @param z 
     */
    constructor(
        public x: number = 0,
        public y: number = 0,
        public z: number = 0
    )
    {
        super();
    }
}
