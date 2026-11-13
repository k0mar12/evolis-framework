import { System, SystemPhase, SystemUpdateMode } from "@/evolis/foundation";
import { AnimationComponent, CharacterStateComponent } from "@/evolis/common";

export class CharacterGroundingSystem extends System {
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
      const state = this.world.findComponent<CharacterStateComponent>(id, CharacterStateComponent);
      const animation = this.world.findComponent<AnimationComponent>(id, AnimationComponent);

      if (!state) {
        continue;
      }

      state.isGrounded = false;

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
              state.isGrounded = true;
            }
          }
        });
      });

      if (state.isGrounded === false && animation) {
        animation.current = "Falling";
      }
    }
  }
}
