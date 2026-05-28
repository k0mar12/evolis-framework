import { Component } from '@/evolis/foundation';
import { type Vec3 } from '@/evolis/common';

export abstract class Vec3Component extends Component
{
    public x: number;
    public y: number;
    public z: number;
    
    /**
     * 
     * @param x
     * @param y 
     * @param z 
     */
    constructor(
        { x = 0, y = 0, z = 0 }: Partial<Vec3> = {}
    )
    {
        super();

        this.x = x;
        this.y = y;
        this.z = z;
    }
}
