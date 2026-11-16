import { Component } from "@/evolis/foundation";

export class ColliderCapsuleComponent extends Component {
  /**
   *
   * @param radius
   * @param height
   */
  constructor(
    public radius: number,
    public height: number,
  ) {
    super();
  }

  /**
   *
   */
  public get halfHeight(): number {
    return this.height * 0.5;
  }
}
