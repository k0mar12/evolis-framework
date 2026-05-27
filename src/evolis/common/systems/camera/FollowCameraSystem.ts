import { Vector3 } from 'three';
import { System, Filter, SystemPhase, type Tick, type EntityId } from '@/evolis/foundation';
import { TargetCameraComponent, TransformComponent, FollowCameraComponent} from '@/evolis/common';

export class FollowCameraSystem extends System
{
    /**
     *
     */
    public override readonly order: SystemPhase = SystemPhase.Camera;

    /**
     *
     */
    public override readonly filter: Filter = new Filter().with(FollowCameraComponent);

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
