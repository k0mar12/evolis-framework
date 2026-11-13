import { SystemUpdateMode } from "@/evolis/foundation";
import {
  System,
  Filter,
  PlayerControlledComponent,
  InputControllerComponent,
  SystemPhase,
  container,
  type EntityId,
  type Tick,
  type InputDevice,
  AnimationComponent,
} from "@/evolis";
import { InputDeviceSymbol } from "@/symbols";

export default class InputSystem extends System {
  /**
   *
   */
  public override readonly updateMode = SystemUpdateMode.Fixed;

  /**
   *
   */
  public override readonly order: SystemPhase = SystemPhase.Input;

  /**
   *
   */
  public override readonly filter: Filter = new Filter().with(
    InputControllerComponent,
    PlayerControlledComponent,
  );

  /**
   *
   */
  private inputDevice!: InputDevice;

  /**
   *
   */
  public override boot(): void {
    this.inputDevice = container().resolve<InputDevice>(InputDeviceSymbol);
  }

  /**
   *
   * @param input
   */
  private handleMoving(input: InputControllerComponent): void {
    input.moveX = +this.inputDevice.isPressed("KeyD") - +this.inputDevice.isPressed("KeyA");
    input.moveZ = +this.inputDevice.isPressed("KeyS") - +this.inputDevice.isPressed("KeyW");
    input.runHeld = this.inputDevice.isPressed("ShiftLeft");
  }

  /**
   *
   * @param input
   * @param deltaTime
   */
  private handleJumping(input: InputControllerComponent, deltaTime: number): void {
    const isPressedSpace = this.inputDevice.isPressed("Space");

    if (isPressedSpace && !input.jumpHeld) {
      input.isJumping = true;
      input.jumpPressed = true;
      input.jumpBufferTimer = 0;
    }

    if (!isPressedSpace && input.jumpHeld) {
      input.jumpReleased = true;
    }

    input.jumpHeld = isPressedSpace;

    if (input.jumpBufferTimer > 0) {
      input.jumpBufferTimer += deltaTime;
    }
  }

  /**
   *
   * @param input
   */
  private handleAnimation(input: InputControllerComponent, animation: AnimationComponent): void {
    animation.current = "Idle";

    if (input.moveX !== 0 || input.moveZ !== 0) {
      animation.current = "Slow-Run";
    }

    if (input.runHeld && (input.moveX !== 0 || input.moveZ !== 0)) {
      animation.current = "Fast-Run";
    }

    if (input.jumpPressed) {
      animation.current = "Jumping";
    }
  }

  /**
   *
   * @param param0
   */
  public update({ deltaTime }: Tick): void {
    this.collection.forEach((id: EntityId) => {
      const input = this.world.getComponent<InputControllerComponent>(id, InputControllerComponent);
      const animation = this.world.findComponent<AnimationComponent>(id, AnimationComponent);

      input.clearFrameFrags();

      this.handleMoving(input);
      this.handleJumping(input, deltaTime);

      if (animation) {
        this.handleAnimation(input, animation);
      }
    });
  }
}
