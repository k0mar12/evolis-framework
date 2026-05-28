import { Component } from '@/evolis/foundation';

import type { LightOptions } from '@/evolis/common';

export abstract class LightComponent extends Component
{
    /**
     * 
     * @param options
     */
    constructor(
        public options: LightOptions = {
            color: 0xffffff,
            intensity: 0.8
        }
    )
    {
        super();
    }
}
