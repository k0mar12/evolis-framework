import { System, Filter, SystemPhase, SystemUpdateMode, type Tick } from "@/evolis/foundation";
import { DynamicBodyComponent, TransformComponent, VelocityComponent } from "@/evolis/common";

export class MovementSystem extends System {
  /**
   *
   */
  public override readonly updateMode = SystemUpdateMode.Fixed;

  /**
   *
   */
  public override readonly order: SystemPhase = SystemPhase.Movement;

  /**
   *
   */
  public override readonly filter: Filter = new Filter()
    .with(TransformComponent, VelocityComponent)
    .without(DynamicBodyComponent);

  /**
   *
   * @param Tick
   */
  public update({ deltaTime }: Tick): void {
    this.collection.forEach((id) => {
      const transform = this.world.getComponent<TransformComponent>(id, TransformComponent);
      const velocity = this.world.getComponent<VelocityComponent>(id, VelocityComponent);

      transform.x += velocity.x * deltaTime;
      transform.y += velocity.y * deltaTime;
      transform.z += velocity.z * deltaTime;
    });
  }
}
