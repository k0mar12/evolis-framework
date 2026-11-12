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
  type Prefab,
  type Vec3,
} from "@/evolis";
import { BoxGeometry, MeshNormalMaterial, Mesh } from "three";

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
  private asset(): Mesh {
    return new Mesh(new BoxGeometry(), new MeshNormalMaterial());
  }

  /**
   *
   * @returns
   */
  public async components(): Promise<Component[]> {
    return [
      new SceneNodeComponent<Mesh>(this.asset()),
      new TransformComponent(this.position),
      new InterpolatedTransformComponent(this.position),
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
