import { Component } from "@/evolis/foundation";
import { type Vec3 } from "@/evolis/common";

/**
 * Visual position history; never changes the authoritative simulation transform.
 *
 */
export class InterpolatedTransformComponent extends Component {
  /**
   *
   */
  public previous: Vec3;

  /**
   *
   */
  public current: Vec3;

  /**
   *
   * @param position
   */
  constructor(position: Vec3 = { x: 0, y: 0, z: 0 }) {
    super();
    this.previous = { ...position };
    this.current = { ...position };
  }
}
