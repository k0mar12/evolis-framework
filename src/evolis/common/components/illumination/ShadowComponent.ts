import { Component } from '@/evolis/foundation';

import type { ShadowOptions } from '@/evolis/common';

export class ShadowComponent extends Component
{
    public cast: boolean;
    public receive: boolean;

    constructor(
        { cast = false, receive = false }: Partial<ShadowOptions> = {}
    )
    {
        super();

        this.cast = cast;
        this.receive = receive;
    }
}
