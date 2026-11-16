import {
  System,
  Filter,
  InputControllerComponent,
  MotionSettingsComponent,
  JumpStateComponent,
  UnderControlComponent,
  VelocityComponent,
  RotationComponent,
  SystemPhase,
  SystemUpdateMode,
  GroundContactComponent,
  type Tick,
  type EntityId,
} from "@/evolis";

export default class CharacterControllerSystem extends System {
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
  public override readonly filter: Filter = new Filter().with(
    UnderControlComponent,
    InputControllerComponent,
    MotionSettingsComponent,
    JumpStateComponent,
    VelocityComponent,
    RotationComponent,
  );

  /**
   *
   * @param current
   * @param target
   * @param maxDelta
   * @returns
   */
  private moveTowards(current: number, target: number, maxDelta: number): number {
    if (Math.abs(target - current) <= maxDelta) {
      return target;
    }

    return current + Math.sign(target - current) * maxDelta;
  }

  /**
   *
   * @param param0
   */
  public update({ deltaTime }: Tick): void {
    this.collection.forEach((id: EntityId) => {
      const body = this.world.physics.bodies.get(id);

      if (!body) {
        return;
      }

      const input = this.world.getComponent<InputControllerComponent>(id, InputControllerComponent);
      const settings = this.world.getComponent<MotionSettingsComponent>(
        id,
        MotionSettingsComponent,
      );
      const velocity = this.world.getComponent<VelocityComponent>(id, VelocityComponent);
      const rotation = this.world.getComponent<RotationComponent>(id, RotationComponent);
      const jump = this.world.getComponent<JumpStateComponent>(id, JumpStateComponent);
      const ground = this.world.findComponent<GroundContactComponent>(id, GroundContactComponent);

      const motion = body.linvel();
      const speed = input.runHeld ? settings.speed.run : settings.speed.walk;
      const maxDelta = settings.acceleration * deltaTime;

      velocity.x = this.moveTowards(motion.x, input.moveX * speed, maxDelta);
      velocity.z = this.moveTowards(motion.z, input.moveZ * speed, maxDelta);
      velocity.y = motion.y;

      if (Math.hypot(velocity.x, velocity.z) > 0.01) {
        rotation.y = Math.atan2(velocity.x, velocity.z);
      }

      if (ground) {
        jump.coyoteBufferTimer = ground.hasLanded ? 0 : jump.coyoteBufferTimer + deltaTime;
        jump.jumpBufferTimer = ground.hasLanded ? 0 : jump.jumpBufferTimer + deltaTime;

        const canCoyote = jump.coyoteBufferTimer <= jump.allowedCoyoteBufferTime;
        const canJump = input.jumpHeld && (ground.hasLanded === true || canCoyote);

        if (canJump) {
          velocity.y = settings.speed.jump;
        }
      }

      body.setLinvel(velocity, true);
    });
  }
}
