import { System } from '../../foundation/core/System';
import { Filter } from '../../foundation/data/Filter';
import { SystemPhase } from '../../foundation/enums/SystemPhase';
import { TransformComponent } from '../components/TransformComponent';
import { VelocityComponent } from '../components/VelocityComponent';

import type { Tick } from '../../foundation/types/Tick';

export class MovementSystem extends System
{
    /**
     *
     */
    public override readonly order: SystemPhase = SystemPhase.Movement;

    /**
     *
     */
    public override readonly filter: Filter = new Filter().with(TransformComponent, VelocityComponent);

    /**
     * 
     * @param Tick
     */
    public update({ deltaTime}: Tick): void
    {
        this.collection.forEach((id) => {
            const transform = this.world.getComponent<TransformComponent>(id, TransformComponent);
            const velocity = this.world.getComponent<VelocityComponent>(id, VelocityComponent);

            transform.x += velocity.x * deltaTime;
            transform.y += velocity.y * deltaTime;
            transform.z += velocity.z * deltaTime;
        });
    }
}
