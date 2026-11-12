import {
  ColliderAABBComponent,
  ColliderCapsuleComponent,
  ColliderTrimeshComponent,
  DynamicBodyComponent,
  StaticBodyComponent,
  TransformComponent,
  VelocityComponent,
} from "@/evolis/common";

import { type PhysicsDefinition } from "@/evolis/foundation/physics/PhysicsDefinition";
import { Filter, System, SystemPhase, SystemUpdateMode, type EntityId } from "@/evolis/foundation";

export class PhysicsRegistrationSystem extends System {
  /**
   *
   */
  public override readonly updateMode = SystemUpdateMode.Fixed;

  /**
   *
   */
  public override readonly order = SystemPhase.PhysicsSetup;

  /**
   *
   */
  private readonly dirty: Set<EntityId> = new Set();

  /**
   *
   */
  public override readonly filter = new Filter()
    .with(TransformComponent)
    .any(DynamicBodyComponent, StaticBodyComponent)
    .any(ColliderAABBComponent, ColliderCapsuleComponent, ColliderTrimeshComponent);

  /**
   *
   */
  public override boot(): void {
    this.world.onEntityChanged((id) => this.dirty.add(id));

    for (const id of this.collection) {
      this.dirty.add(id);
    }
  }

  /**
   *
   */
  public update(): void {
    for (const id of this.dirty) {
      if (!this.filter.matches(this.world.query.getMask(id))) {
        this.world.physics.remove(id);
      } else {
        this.world.physics.reconcile(id, this.readDefinition(id));
      }

      this.dirty.delete(id);
    }
  }

  /**
   *
   * @param id
   * @returns
   */
  private readDefinition(id: EntityId): PhysicsDefinition {
    const position = this.world.getComponent<TransformComponent>(id, TransformComponent);
    const box = this.world.findComponent<ColliderAABBComponent>(id, ColliderAABBComponent);
    const capsule = this.world.findComponent<ColliderCapsuleComponent>(
      id,
      ColliderCapsuleComponent,
    );
    const mesh = this.world.findComponent<ColliderTrimeshComponent>(id, ColliderTrimeshComponent);
    const dynamic = this.world.findComponent<DynamicBodyComponent>(id, DynamicBodyComponent);
    const fixed = this.world.findComponent<StaticBodyComponent>(id, StaticBodyComponent);
    const velocity = this.world.findComponent<VelocityComponent>(id, VelocityComponent);

    if (Number(!!box) + Number(!!capsule) + Number(!!mesh) !== 1) {
      throw new Error(`Entity ${id} must have exactly one physics collider.`);
    }

    if (dynamic && fixed) {
      throw new Error(`Entity ${id} cannot be both static and dynamic.`);
    }

    return {
      kind: dynamic ? "dynamic" : "static",
      position: { x: position.x, y: position.y, z: position.z },
      velocity: velocity ? { x: velocity.x, y: velocity.y, z: velocity.z } : undefined,
      gravityScale: dynamic?.gravityScale ?? 1,
      collider: mesh
        ? {
            kind: "trimesh",
            vertices: mesh.vertices,
            indices: mesh.indices,
            revision: mesh.revision,
          }
        : capsule
          ? { kind: "capsule", radius: capsule.radius, halfHeight: capsule.halfHeight }
          : { kind: "box", x: box!.x, y: box!.y, z: box!.z },
    };
  }
}
