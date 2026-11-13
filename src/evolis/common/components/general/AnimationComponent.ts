import { type AnimationClip } from "three";

export class AnimationComponent {
  /**
   *
   * @param clips
   * @param current
   */
  constructor(
    public clips: Array<AnimationClip>,
    public current: string,
    public prevent: string | null = null,
  ) {}
}
