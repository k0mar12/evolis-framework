import { type RigidBody } from '@dimforge/rapier3d-compat';
import { System, SystemPhase, SystemUpdateMode, type EntityId, type Tick } from '@/evolis/foundation';
import { InterpolatedTransformComponent, TransformComponent, VelocityComponent } from '@/evolis/common';

/**
 * Dynamic poses and actual velocities are owned by Rapier.
 *
 */
export class PhysicsSyncSystem extends System
{
  /**
   *
   */
  public override readonly updateMode = SystemUpdateMode.Fixed;

  /**
   *
   */
  public override readonly order = SystemPhase.Physics;

  /**
   *
   */
  private readonly targets = new Map<EntityId, {
      position: TransformComponent | null;
      velocity: VelocityComponent | null;
      interpolation: InterpolatedTransformComponent | null;
  }>();

  /**
   *
   */
  private readonly observedBodies = new Map<EntityId, RigidBody>();

  /**
   *
   */
  public override boot(): void
  {
    this.world.onEntityChanged(id => {
      this.targets.delete(id);

      if (! this.world.findComponent(id, TransformComponent)) {
        this.observedBodies.delete(id);
      }
    });
  }

  /**
   *
   */
  public update({ deltaTime }: Tick): void
  {
    this.world.physics.simulation.timestep = deltaTime;
    this.world.physics.simulation.step();

    for (const [id, body] of this.world.physics.bodies) {
      let target = this.targets.get(id);

      if (! target) {
        target = {
          interpolation: this.world.findComponent<InterpolatedTransformComponent>(id, InterpolatedTransformComponent),
          position: this.world.findComponent<TransformComponent>(id, TransformComponent),
          velocity: this.world.findComponent<VelocityComponent>(id, VelocityComponent),
        };

        this.targets.set(id, target);
      }

      const { position, velocity, interpolation } = target;

      if (this.observedBodies.get(id) !== body) {
        if (position && interpolation) {
          interpolation.previous = position;
          interpolation.current = position;
        }

        this.observedBodies.set(id, body);
      }

      if (interpolation) {
        interpolation.previous = interpolation.current;
        interpolation.current = body.translation();
      }

      if (position) {
        Object.assign(position, body.translation());
      }

      if (velocity) {
        Object.assign(velocity, body.linvel());
      }
    }
  }
}
