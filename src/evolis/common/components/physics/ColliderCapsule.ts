import { Component } from "@/evolis/foundation";

export class ColliderCapsule extends Component
{
    constructor(
        public radius: number,
        public height: number
    )
    {
        super();
    }

    /**
     *
     */
    public get halfHeight(): number
    {
        return this.height * 0.5;
    }
}
