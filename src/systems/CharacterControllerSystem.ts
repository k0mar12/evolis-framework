import {
    System,
    Filter,
    InputControllerComponent,
    SettingsControllerComponent,
    PlayerControlledComponent,
    VelocityComponent,
    GravityComponent,
    SystemPhase,
    type Tick,
} from '@/evolis';

export default class CharacterControllerSystem extends System
{
    /**
     *
     */
    public override readonly order: SystemPhase = SystemPhase.Movement;

    /**
     *
     */
    public override readonly filter: Filter = new Filter().with(
        PlayerControlledComponent,
        InputControllerComponent,
        SettingsControllerComponent,
        VelocityComponent,
        GravityComponent
    );

    /**
     * 
     * @param current
     * @param target 
     * @param maxDelta 
     * @returns 
     */
    public moveTowards(current: number, target: number, maxDelta: number): number
    {
        if (Math.abs(target - current) <= maxDelta) {
            return target;
        }

        return current + Math.sign(target - current) * maxDelta;
    }

    /**
     * 
     * @param param0
     */
    public update({ deltaTime}: Tick): void
    {
        this.collection.forEach((id) => {
            const input = this.world.getComponent<InputControllerComponent>(id, InputControllerComponent);
            const settings = this.world.getComponent<SettingsControllerComponent>(id, SettingsControllerComponent);
            const velocity = this.world.getComponent<VelocityComponent>(id, VelocityComponent);
            const gravity = this.world.getComponent<GravityComponent>(id, GravityComponent);

            const speed = input.runHeld ? settings.speed.run : settings.speed.walk;

            const maxDelta = settings.acceleration * deltaTime;

            velocity.x = this.moveTowards(velocity.x, input.moveX * speed, maxDelta);
            velocity.z = this.moveTowards(velocity.z, input.moveZ * speed, maxDelta);

            gravity.coyoteTimer = gravity.isGrounded ? 0 : gravity.coyoteTimer + deltaTime;

            const canCoyoteJump = gravity.coyoteTimer <= settings.coyoteTime;
            const jumpBuffered = input.jumpPressed && input.jumpBufferTimer <= settings.jumpBufferTime;

            if (jumpBuffered && (gravity.isGrounded || canCoyoteJump)) {
                velocity.y = settings.speed.jump;
                gravity.isGrounded = false;
                input.jumpBufferTimer = Infinity;
            }
        })
    }
}
