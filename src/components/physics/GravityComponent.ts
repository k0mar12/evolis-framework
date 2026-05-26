import { Component } from '@/evolis';

export class GravityComponent extends Component
{
    public isGrounded: boolean = true;
    public coyoteTimer: number = 0;
    public index = -9.8;
}
