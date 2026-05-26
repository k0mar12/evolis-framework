import { Component } from '@/evolis';

type Speed = {
    walk: number,
    run: number,
    jump: number
};

export class SettingsComponent extends Component
{
    public jumpBufferTime: number = 0.10;
    public coyoteTime: number = 0.18;
    public acceleration: number = 25;

    public speed: Speed = {
        walk: 1,
        run: 7,
        jump: 10
    };
}
