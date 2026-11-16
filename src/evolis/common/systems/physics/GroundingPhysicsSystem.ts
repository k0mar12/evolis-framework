import { System, SystemPhase, SystemUpdateMode } from "@/evolis/foundation";
import { GroundContactComponent } from "@/evolis/common";

export class GroundingPhysicsSystem extends System {
  /**
   *
   */
  public override readonly updateMode = SystemUpdateMode.Fixed;

  /**
   *
   */
  public override readonly order = SystemPhase.Collision;

  /**
   *
   */
  public update(): void {
    const physics = this.world.physics;

    for (const [id, body] of physics.bodies) {
      const groundContact = this.world.findComponent<GroundContactComponent>(id, GroundContactComponent);

      if (!groundContact) {
        continue;
      }

      groundContact.hasLanded = false;

      if (body.linvel().y > 0.1) {
        continue;
      }

      const collider = physics.colliders.get(id)!;

      physics.simulation.contactPairsWith(collider, (other) => {
        physics.simulation.contactPair(collider, other, (manifold, flipped) => {
          if (manifold.normal().y * (flipped ? 1 : -1) < Math.cos(Math.PI / 4)) {
            return;
          }

          for (let i = 0; i < manifold.numContacts(); i++) {
            if (manifold.contactDist(i) <= 0.02) {
              groundContact.hasLanded = true;
            }
          }
        });
      });
    }
  }
}
