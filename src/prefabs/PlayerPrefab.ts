import {
  SceneNodeComponent,
  TransformComponent,
  RotationComponent,
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
import { Box3, CapsuleGeometry, Group, Mesh, MeshBasicMaterial, type Object3D } from "three";

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
    const capsule = new ColliderCapsuleComponent(0.4, 1.2);
    const visual = new Group();
    visual.add(model.scene);

    // Keep the entity origin at the physics body's center and the feet at
    // the bottom of the capsule. Offset a parent so animation tracks cannot
    // overwrite the alignment of the model.
    const bounds = new Box3().setFromObject(model.scene, true);
    if (!bounds.isEmpty()) {
      visual.position.y = -(capsule.halfHeight + capsule.radius) - bounds.min.y;
    }

    const root = new Group();
    root.add(visual);

    const capsuleMesh = new Mesh(
      new CapsuleGeometry(capsule.radius, capsule.height, 8, 16),
      new MeshBasicMaterial({
        color: 0x00ff88,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      }),
    );
    capsuleMesh.name = "PlayerColliderDebug";
    root.add(capsuleMesh);

    return [
      new SceneNodeComponent<Object3D>(root),
      new TransformComponent(this.position),
      new RotationComponent(),
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
      capsule,
    ];
  }
}
