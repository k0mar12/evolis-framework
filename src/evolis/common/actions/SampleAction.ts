import { Action, InterpolatedTransformComponent } from '@/evolis/common';
import { Vector3 } from 'three';

export class SampleAction extends Action<void>
{
  /**
   *
   * @param position
   * @param component
   * @param alpha
   */
  constructor(
    protected position: Vector3,
    protected component: InterpolatedTransformComponent,
    protected alpha: number
  )
  {
    super();
  }

  /**
   *
   * @returns number
   */
  protected get t(): number
  {
    return Math.max(0, Math.min(1, this.alpha));
  }

  /**
   *
   * @returns void
   */
  public handle(): void
  {
    const t = this.t;
    const { previous, current } = this.component;

    this.position.set(
      previous.x + (current.x - previous.x) * t,
      previous.y + (current.y - previous.y) * t,
      previous.z + (current.z - previous.z) * t
    );
  }
}
