import { Vector3 } from "three";
import { System, Filter, SystemPhase, type Tick, type EntityId } from "@/evolis/foundation";
import {
  InterpolatedTransformComponent,
  TargetCameraComponent,
  TransformComponent,
  FollowCameraComponent,
  SampleAction,
} from "@/evolis/common";

export class FollowCameraSystem extends System {
  /**
   *
   */
  public override readonly order: SystemPhase = SystemPhase.Camera;

  /**
   * Smooth position
   */
  public readonly position = new Vector3();

  /**
   *
   * @private
   */
  private readonly targetPosition = new Vector3();

  /**
   *
   */
  public override readonly filter: Filter = new Filter().with(FollowCameraComponent);

  /**
   *
   */
  protected get target(): EntityId | null {
    return this.world.query.find(new Filter().with(TargetCameraComponent)).first();
  }

  /**
   *
   * @param Tick
   */
  public update({ deltaTime, interpolationAlpha = 1 }: Tick): void {
    if (this.target === null) {
      return;
    }

    const transform = this.world.getComponent<TransformComponent>(this.target, TransformComponent);
    const interpolated = this.world.findComponent<InterpolatedTransformComponent>(
      this.target,
      InterpolatedTransformComponent,
    );

    this.targetPosition.set(transform.x, transform.y, transform.z);

    if (interpolated) {
      SampleAction.do(this.targetPosition, interpolated, interpolationAlpha);
    }

    this.collection.forEach((id) => {
      const { yaw, pitch, distance, height, lerpSpeed, lookAtOffsetY } =
        this.world.getComponent<FollowCameraComponent>(id, FollowCameraComponent);

      this.position.set(
        this.targetPosition.x + distance * Math.sin(yaw),
        this.targetPosition.y + height + distance * Math.sin(pitch),
        this.targetPosition.z + distance * Math.cos(yaw),
      );

      this.context.camera.position.lerp(this.position, 1 - Math.exp(-lerpSpeed * deltaTime));

      this.context.camera.lookAt(
        this.targetPosition.x,
        this.targetPosition.y + lookAtOffsetY,
        this.targetPosition.z,
      );
    });
  }
}
