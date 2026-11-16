import {
  SceneNodeComponent,
  TransformComponent,
  RotationComponent,
  InterpolatedTransformComponent,
  ShadowComponent,
  VelocityComponent,
  UnderControlComponent,
  InputControllerComponent,
  MotionSettingsComponent,
  JumpStateComponent,
  TargetCameraComponent,
  Component,
  DynamicBodyComponent,
  ColliderCapsuleComponent,
  GroundContactComponent,
  AnimationComponent,
  app,
  createMeshDebugMaterials,
  type Prefab,
  type Vec3,
} from "@/evolis";
import { Box3, CapsuleGeometry, Group, Mesh, type Object3D } from "three";

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
  public async components(): Promise<Component[]> {
    const model = await app().modelLoader.load("./bot.glb");

    const capsule = new ColliderCapsuleComponent(0.4, 1.2);
    const bounds = new Box3().setFromObject(model.scene, true);

    const capsuleMesh = new Mesh(
      new CapsuleGeometry(capsule.radius, capsule.height, 8, 16),
      createMeshDebugMaterials(),
    );

    const visual = new Group();
    const root = new Group();

    visual.position.y = -(capsule.halfHeight + capsule.radius) - bounds.min.y;

    visual.add(model.scene);
    root.add(visual, capsuleMesh);

    return [
      new SceneNodeComponent<Object3D>(root),
      new TransformComponent(this.position),
      new RotationComponent(),
      new InterpolatedTransformComponent(this.position),
      new AnimationComponent(model.animations, "Idle"),
      new ShadowComponent({ cast: true }),
      new VelocityComponent(),
      new InputControllerComponent(),
      new UnderControlComponent(),
      new MotionSettingsComponent(),
      new JumpStateComponent(),
      new TargetCameraComponent(),
      new DynamicBodyComponent(2),
      new GroundContactComponent(),
      capsule,
    ];
  }
}
