import { System, Filter, SystemPhase, type Tick } from "@/evolis/foundation";
import {
  InterpolatedTransformComponent,
  SceneNodeComponent,
  TransformComponent,
  RotationComponent,
  SampleAction,
} from "@/evolis/common";

export class RenderSystem extends System {
  /**
   *
   */
  public override readonly order: SystemPhase = SystemPhase.Render;

  /**
   *
   */
  protected readonly transformFilter: Filter = new Filter().with(
    SceneNodeComponent,
    TransformComponent,
  );

  /**
   *
   */
  protected readonly rotationFilter: Filter = new Filter().with(
    SceneNodeComponent,
    RotationComponent,
  );

  /**
   *
   * @param Tick
   */
  public update({ interpolationAlpha = 1 }: Tick): void {
    this.world.query.find(this.transformFilter).forEach((id) => {
      const mesh = this.world.getComponent<SceneNodeComponent>(id, SceneNodeComponent);
      const transform = this.world.getComponent<TransformComponent>(id, TransformComponent);
      const interpolated = this.world.findComponent<InterpolatedTransformComponent>(
        id,
        InterpolatedTransformComponent,
      );

      mesh.object.position.set(transform.x, transform.y, transform.z);

      if (interpolated) {
        SampleAction.do(mesh.object.position, interpolated, interpolationAlpha);
      }

      if (!mesh.object.matrixAutoUpdate) {
        mesh.object.updateMatrix();
      }
    });

    this.world.query.find(this.rotationFilter).forEach((id) => {
      const mesh = this.world.getComponent<SceneNodeComponent>(id, SceneNodeComponent);
      const rotation = this.world.getComponent<RotationComponent>(id, RotationComponent);

      mesh.object.rotation.set(rotation.x, rotation.y, rotation.z);

      if (!mesh.object.matrixAutoUpdate) {
        mesh.object.updateMatrix();
      }
    });
  }
}
