import { Component } from '@/evolis/foundation';

import type { Speed } from '@/evolis/common';

export class SettingsControllerComponent extends Component
{
    public jumpBufferTime: number = 0.10;
    public coyoteTime: number = 0.18;
    public acceleration: number = 25;

    public speed: Speed = {
        walk: 5,
        run: 7,
        jump: 8
    };
}
