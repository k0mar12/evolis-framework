import { Component } from '@/evolis/foundation';

export class ColliderAABBComponent extends Component
{
    constructor(
        public halfX: number = 0.5,
        public halfY: number = 0.5,
        public halfZ: number = 0.5
    )
    {
        super();
    }
}
