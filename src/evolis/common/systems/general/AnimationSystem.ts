import { Filter, System, SystemPhase, type EntityId, type Tick } from "@/evolis/foundation";
import { SceneNodeComponent, AnimationComponent } from "@/evolis/common";
import { AnimationMixer } from "three";

export class AnimationSystem extends System {
  /**
   *
   */
  public readonly order: SystemPhase = SystemPhase.Animation;

  /**
   *
   */
  public override readonly filter: Filter = new Filter().with(
    SceneNodeComponent,
    AnimationComponent,
  );

  /**
   *
   */
  public readonly mixers: Map<EntityId, AnimationMixer> = new Map();

  /**
   *
   * @param param0
   */
  public update({ deltaTime }: Tick): void {
    this.collection.forEach((id: EntityId): void => {
      const scene = this.world.getComponent<SceneNodeComponent>(id, SceneNodeComponent);
      const animation = this.world.getComponent<AnimationComponent>(id, AnimationComponent);

      const mixer =
        this.mixers.get(id) ?? this.mixers.set(id, new AnimationMixer(scene.object)).get(id);

      if (mixer === undefined) {
        return;
      }

      mixer.update(deltaTime);

      if (animation.current !== animation.prevent) {
        const clip = animation.clips.find((item) => item.name === animation.current);

        if (clip) {
          const nextAction = mixer.clipAction(clip);
          const previousAction = animation.prevent
            ? mixer.clipAction(animation.clips.find((item) => item.name === animation.prevent)!)
            : null;

          nextAction.reset().play();

          if (previousAction) {
            previousAction.crossFadeTo(nextAction, 0.2, false);
          }

          animation.prevent = animation.current;
        }
      }
    });
  }
}
