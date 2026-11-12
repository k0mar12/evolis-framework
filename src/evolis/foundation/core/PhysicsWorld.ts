import { ColliderFactory } from '../physics/ColliderFactory';
import { type PhysicsDefinition } from '../physics/PhysicsDefinition';
import { World as RapierWorld, RigidBody, Collider, RigidBodyDesc } from '@dimforge/rapier3d-compat';
import { type EntityId } from '@/evolis/foundation';
import { type Vec3 } from '@/evolis/common';

export class PhysicsWorld
{
  /**
   *
   */
  public readonly simulation: RapierWorld;

  /**
   *
   */
  public readonly bodies: Map<EntityId, RigidBody> = new Map();

  /**
   *
   */
  public readonly colliders: Map<EntityId, Collider> = new Map();

  /**
   *
   */
  private readonly definitions: Map<EntityId, PhysicsDefinition> = new Map();

  /**
   *
   * @param gravity
   */
  constructor(gravity: Vec3 = { x: 0, y: -9.8, z: 0 })
  {
    this.simulation = new RapierWorld(gravity);
  }

  /**
   *
   * @param id
   * @param next
   */
  public reconcile(id: EntityId, next: PhysicsDefinition): void
  {
    const previous = this.definitions.get(id);

    if (! previous || previous.kind !== next.kind) {
      // Build the descriptor before removing an existing object.
      const shape = ColliderFactory.create(next.collider);
      this.remove(id);

      if (next.kind === 'dynamic') {
        const body = this.simulation.createRigidBody(RigidBodyDesc.dynamic()
          .setTranslation(next.position.x, next.position.y, next.position.z)
          .lockRotations().setGravityScale(next.gravityScale).setCcdEnabled(true));

        if (next.velocity) {
          body.setLinvel(next.velocity, true);
        }

        this.bodies.set(id, body);
        this.colliders.set(id, this.simulation.createCollider(shape.setFriction(0), body));
      } else {
        this.colliders.set(
          id,
          this.simulation.createCollider(
            shape.setTranslation(
              next.position.x, next.position.y, next.position.z
            )
          )
        );
      }
    } else {
      const collider = this.colliders.get(id)!;
      const body = this.bodies.get(id);

      if (! ColliderFactory.equals(previous.collider, next.collider)) {
        collider.setShape(ColliderFactory.create(next.collider).shape);

        if (body) {
          body.wakeUp();
        }
      }

      if (body && previous.gravityScale !== next.gravityScale) {
          body.setGravityScale(next.gravityScale, true);
      }

      if (
        next.kind === 'static' && (
          previous.position.x !== next.position.x
          || previous.position.y !== next.position.y
          || previous.position.z !== next.position.z
        )
      ) {
          collider.setTranslation(next.position);
      }
    }

    this.definitions.set(id, {
      ...next,
      position: { ...next.position },
      velocity: next.velocity ? { ...next.velocity } : undefined,
      collider: { ...next.collider }
    });
  }

  /**
   *
   * @param id
   */
  public remove(id: EntityId): void
  {
    const body = this.bodies.get(id);
    const collider = this.colliders.get(id);

    if (body) {
      this.simulation.removeRigidBody(body);
    } else if (collider) {
      this.simulation.removeCollider(collider, true);
    }

    this.definitions.delete(id);
    this.bodies.delete(id);
    this.colliders.delete(id);
  }

  /**
    *
    */
  public dispose(): void
  {
    this.simulation.free();
    this.definitions.clear();
    this.bodies.clear();
    this.colliders.clear();
  }
}
