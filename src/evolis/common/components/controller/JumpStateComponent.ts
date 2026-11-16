import { Component } from "@/evolis/foundation";

export class JumpStateComponent extends Component {

  /**
   *
   */
  public coyoteBufferTimer: number = 0;

  /**
   *
   */
  public jumpBufferTimer: number = 0;

  /**
   *
   * @param allowedJumpBufferTime
   * @param allowedCoyoteBufferTime
   */
  constructor(
    public allowedCoyoteBufferTime: number = 0.18
  ) {
    super();
  }
}
