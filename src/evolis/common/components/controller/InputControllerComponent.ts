import { Component } from '@/evolis/foundation';

export class InputControllerComponent extends Component
{
    public moveX: number = 0;
    public moveZ: number = 0;

    public runHeld: boolean = false;
    public jumpHeld: boolean = false;

    public jumpPressed: boolean = false;
    public jumpReleased: boolean = false;

    public jumpBufferTimer: number = 0;

    /**
     *
     */
    public clearFrameFrags(): void
    {
        this.jumpPressed = false;
        this.jumpReleased = false;
    }
}
