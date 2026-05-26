import {
    System,
    Filter,
    VelocityComponent,
    TransformComponent,
    SystemPhase,
    type Tick
} from '@/evolis';

import { GravityComponent } from '@/components/physics/GravityComponent';

export default class GravitySystem extends System
{
    /**
     *
     */
    public override readonly order: SystemPhase = SystemPhase.Physic;

    /**
     *
     */
    public override readonly filter: Filter = new Filter().with(
        TransformComponent,
        VelocityComponent,
        GravityComponent
    );

    public update({ deltaTime }: Tick): void
    {
        this.collection.forEach((id) => {
            const transform = this.world.getComponent<TransformComponent>(id, TransformComponent);
            const velocity = this.world.getComponent<VelocityComponent>(id, VelocityComponent);
            const gravity = this.world.getComponent<GravityComponent>(id, GravityComponent);

            if (transform.y <= 0) {
                transform.y = 0;
                
                if (velocity.y < 0) {
                    velocity.y = 0;
                }

                gravity.isGrounded = true;
            }

            if (! gravity.isGrounded) {
                velocity.y += gravity.index * deltaTime;
            }
        });
    }
}
