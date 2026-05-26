import { Vector3 } from 'three';
import { System } from '../../../foundation/core/System';
import { Filter } from '../../../foundation/data/Filter';
import { TargetCameraComponent } from '../../components/tags/TargetCameraComponent';
import { TransformComponent } from '../../components/TransformComponent';
import { FollowCameraComponent } from '../../components/camera/FollowCameraComponent';

import type { SystemOrder } from '../../../foundation/types/SystemOrder';
import type { Tick } from '../../../foundation/types/Tick';
import type { EntityId } from '../../../foundation/types/EntityId';

export class FollowCameraSystem extends System
{
    /**
     *
     */
    public readonly order: SystemOrder = 2;

    /**
     *
     */
    public readonly filter: Filter = new Filter()
        .with(FollowCameraComponent);

    /**
     * Smooth position
     */
    public readonly position = new Vector3();

    /**
     *
     */
    private get target(): EntityId | null
    {
        return this.world.query.find(new Filter().with(TargetCameraComponent)).first();
    }

    /**
     * 
     * @param Tick
     */
    public update({ deltaTime }: Tick): void
    {
        if (this.target === null) {
            return;
        }

        const targetTransform = this.world.getComponent<TransformComponent>(this.target, TransformComponent);

        this.collection.forEach((id) => {
            const { yaw, pitch, distance, height, lerpSpeed, lookAtOffsetY } = this.world.getComponent<FollowCameraComponent>(id, FollowCameraComponent);

            this.position.set(
                targetTransform.x + distance * Math.sin(yaw),
                targetTransform.y + height + distance * Math.sin(pitch),
                targetTransform.z + distance * Math.cos(yaw)
            );

            this.context.camera.position.lerp(this.position, lerpSpeed * deltaTime);

            this.context.camera.lookAt(
                targetTransform.x,
                targetTransform.y + lookAtOffsetY,
                targetTransform.z
            );
        });
    }
}
