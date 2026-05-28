import {
    Collection,
    Filter,
    System,
    SystemPhase,
    type ComponentConstructor
} from '@/evolis/foundation';

import {
    ColliderAABBComponent,
    DynamicBodyComponent,
    GravityComponent,
    SceneNodeComponent,
    SpatialGrid,
    StaticBodyComponent,
    TransformComponent,
    VelocityComponent
} from '@/evolis/common';

type Deps = {
    dist: number,
    overlap: number
}

export class CollisionAABBSystem extends System
{
    /**
     *
     */
    public override readonly order: SystemPhase = SystemPhase.Collision;

    /**
     *
     */
    protected readonly grid: SpatialGrid = new SpatialGrid(10);

    /**
     *
     */
    protected readonly collidable: Array<ComponentConstructor> = [
        TransformComponent,
        SceneNodeComponent,
        ColliderAABBComponent
    ];

    /**
     *
     */
    protected readonly dynamicTags: Array<ComponentConstructor> = [
        ...this.collidable,
        DynamicBodyComponent,
        VelocityComponent,
    ];

    /**
     *
     */
    protected readonly staticTags: Array<ComponentConstructor> = [
        ...this.collidable,
        StaticBodyComponent
    ];

    /**
     *
     */
    protected dynamicsFilter: Filter = new Filter().with(...this.dynamicTags); 

    /**
     *
     */
    protected staticsFilter: Filter = new Filter().with(...this.staticTags);

    /**
     *
     */
    protected get dynamics(): Collection
    {
        return this.world.query.find(this.dynamicsFilter);
    }

    /**
     *
     */
    protected get statics(): Collection
    {
        return this.world.query.find(this.staticsFilter);
    }

    /**
     * 
     * @param aPos
     * @param aHalf 
     * @param bPos 
     * @param bHalf 
     */
    protected overlapOnAxis(aPos: number, aHalf: number, bPos: number, bHalf: number): Deps
    {
        const dist = aPos - bPos;
        const overlap = (aHalf + bHalf) - Math.abs(dist);

        return {
            dist, overlap
        };
    }

    /**
     *
     */
    protected fillGrid(): void
    {
        this.grid.clear()

        for (const s of this.statics) {
            const st = this.world.getComponent<TransformComponent>(s, TransformComponent);

            this.grid.insert(s, st.x, st.z);
        }
    }

    /**
     * 
     * @param param0
     */
    public update(): void
    {
        this.fillGrid();

        for (const d of this.dynamics) {
            const dTransform = this.world.getComponent<TransformComponent>(d, TransformComponent);
            const dVelocity = this.world.getComponent<VelocityComponent>(d, VelocityComponent);
            const dCollider = this.world.getComponent<ColliderAABBComponent>(d, ColliderAABBComponent);
            const dGravity = this.world.findComponent<GravityComponent>(d, GravityComponent);

            const nearby = this.grid.getNearby(dTransform.x, dTransform.z);

            if (dGravity) {
                dGravity.isGrounded = false;
            }

            for (const s of nearby) {
                const sTransform = this.world.getComponent<TransformComponent>(s, TransformComponent);
                const sCollider = this.world.getComponent<ColliderAABBComponent>(s, ColliderAABBComponent);

                const ox = this.overlapOnAxis(dTransform.x, dCollider.x, sTransform.x, sCollider.x);
                const oy = this.overlapOnAxis(dTransform.y, dCollider.y, sTransform.y, sCollider.y);
                const oz = this.overlapOnAxis(dTransform.z, dCollider.z, sTransform.z, sCollider.z);

                if (ox.overlap <= 0 || oy.overlap <= 0 || oz.overlap <= 0) {
                    continue;
                }

                if (ox.overlap <= oy.overlap && ox.overlap <= oz.overlap) {
                    dTransform.x += ox.overlap * Math.sign(ox.dist);
                    dVelocity.x  = 0;
                } else if (oy.overlap <= ox.overlap && oy.overlap <= oz.overlap) {
                    dTransform.y += oy.overlap * Math.sign(oy.dist);
                    dVelocity.y  = 0;

                    if (oy.dist > 0 && dGravity) {
                        dGravity.isGrounded = true;
                    }
                } else {
                    dTransform.z += oz.overlap * Math.sign(oz.dist);
                    dVelocity.z  = 0;
                }
            }
        }
    }
}
