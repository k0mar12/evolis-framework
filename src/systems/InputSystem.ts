import { SystemUpdateMode } from "@/evolis/foundation";
import {
  System,
  Filter,
  SystemPhase,
  UnderControlComponent,
  InputControllerComponent,
  AnimationComponent,
  container,
  type EntityId,
  type Tick,
  type InputDevice,
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
    UnderControlComponent,
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
  private handleAnimation(input: InputControllerComponent, animation: AnimationComponent): void {
    animation.current = "Idle";

    if (input.moveX !== 0 || input.moveZ !== 0) {
      animation.current = "Slow-Run";
    }

    if (input.runHeld && (input.moveX !== 0 || input.moveZ !== 0)) {
      animation.current = "Fast-Run";
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

      input.moveX = +this.inputDevice.isPressed("KeyD") - +this.inputDevice.isPressed("KeyA");
      input.moveZ = +this.inputDevice.isPressed("KeyS") - +this.inputDevice.isPressed("KeyW");
      input.runHeld = this.inputDevice.isPressed("ShiftLeft");
      input.jumpHeld = this.inputDevice.isPressed("Space");

      if (animation) {
        this.handleAnimation(input, animation);
      }
    });
  }
}
