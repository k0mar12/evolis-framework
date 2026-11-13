import {
  SceneNodeComponent,
  TransformComponent,
  InterpolatedTransformComponent,
  ShadowComponent,
  VelocityComponent,
  PlayerControlledComponent,
  InputControllerComponent,
  SettingsControllerComponent,
  CharacterStateComponent,
  TargetCameraComponent,
  Component,
  DynamicBodyComponent,
  ColliderCapsuleComponent,
  AnimationComponent,
  app,
  type Prefab,
  type Vec3,
  type LoadedModel,
} from "@/evolis";
import { type Object3D } from "three";

export default class PlayerPrefab implements Prefab {
  /**
   *
   * @param position
   */
  constructor(protected position: Vec3 = { x: 0, y: 0, z: 0 }) {}

  /**
   *
   * @returns
   */
  private async asset(): Promise<LoadedModel> {
    return app().modelLoader.load("./bot.glb");
  }

  /**
   *
   * @returns
   */
  public async components(): Promise<Component[]> {
    const model = await this.asset();

    return [
      new SceneNodeComponent<Object3D>(model.scene),
      new TransformComponent(this.position),
      new InterpolatedTransformComponent(this.position),
      new AnimationComponent(model.animations, "Idle"),
      new ShadowComponent({ cast: true }),
      new VelocityComponent(),
      new CharacterStateComponent(),
      new InputControllerComponent(),
      new PlayerControlledComponent(),
      new SettingsControllerComponent(),
      new TargetCameraComponent(),
      new DynamicBodyComponent(2),
      new ColliderCapsuleComponent(0.4, 1.2),
    ];
  }
}
