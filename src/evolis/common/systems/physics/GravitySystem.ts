import { System, SystemPhase, Filter, type Tick } from '@/evolis/foundation';
import { VelocityComponent, GravityComponent } from '@/evolis/common';

export class GravitySystem extends System
{
    /**
     *
     */
    public override readonly order: SystemPhase = SystemPhase.Physic;

    /**
     *
     */
    public override readonly filter: Filter = new Filter().with(
        VelocityComponent,
        GravityComponent
    );

    /**
     * 
     * @param param0
     */
    public update({ deltaTime }: Tick): void
    {
        this.collection.forEach((id) => {
            const velocity = this.world.getComponent<VelocityComponent>(id, VelocityComponent);
            const gravity = this.world.getComponent<GravityComponent>(id, GravityComponent);

            if (! gravity.isGrounded) {
                velocity.y += gravity.index * gravity.weight * deltaTime;
            }
        });
    }
}
