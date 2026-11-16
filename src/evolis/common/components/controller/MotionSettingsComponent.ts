import { Component } from "@/evolis/foundation";
import { type Speed } from "@/evolis/common";

export class MotionSettingsComponent extends Component {
  /**
   *
   */
  public speed: Speed;

  /**
   *
   * @param speed
   * @param acceleration
   * @param allowedJumpBufferTime
   */
  constructor(
    speed: Partial<Speed> = {},
    public acceleration: number = 25,
  ) {
    super();
    this.speed = { walk: 5, run: 7, jump: 8, ...speed };
  }
}
