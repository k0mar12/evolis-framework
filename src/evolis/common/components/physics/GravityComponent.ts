import { Component } from '@/evolis/foundation';

export class GravityComponent extends Component
{
    /**
     * 
     */
    public isGrounded: boolean = true;

    /**
     * 
     */
    public coyoteTimer: number = 0;

    /**
     * 
     * @param index
     */
    constructor(
        public weight: number = 1,
        public index: number = -9.8
    )
    {
        super();
    }
}
