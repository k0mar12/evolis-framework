import { Component } from '@/evolis/foundation';

export class ColliderTrimeshComponent extends Component
{
    public revision = 0;

    /** Call after editing vertices or indices, then call world.markEntityChanged(id). */
    public markGeometryChanged(): void
    {
        this.revision++;
    }

    /**
     *
     * @param vertices
     * @param indices
     */
    constructor(
        public readonly vertices: Float32Array,
        public readonly indices: Uint32Array
    )
    {
        super();
    }
}
