import { Component, type Prefab } from "@/evolis/foundation";
import {
  ColliderAABBComponent,
  TransformComponent,
  SceneNodeComponent,
  StaticBodyComponent,
} from "@/evolis/common";
import { Box3, Group, Vector3, BoxGeometry, EdgesGeometry, LineBasicMaterial, LineSegments, type Object3D } from "three";

export class HitboxPrefab implements Prefab {
  /**
   *
   * @param object
   */
  constructor(protected object: Object3D) {}

  /**
   *
   */
  public async components(): Promise<Component[]> {
    const bounds = new Box3().setFromObject(this.object);
    const center = bounds.getCenter(new Vector3());
    const halfSize = bounds.getSize(new Vector3()).multiplyScalar(0.5);

    if (bounds.isEmpty() || halfSize.x <= 0 || halfSize.y <= 0 || halfSize.z <= 0) {
      throw new Error(`Hitbox "${this.object.name}" must have non-zero bounds on all axes.`);
    }

    const node = new Group();

    const debugGeometry = new EdgesGeometry(
      new BoxGeometry(halfSize.x * 2, halfSize.y * 2, halfSize.z * 2),
    );
    const debugMesh = new LineSegments(
      debugGeometry,
      new LineBasicMaterial({ color: 0x00ff88, depthTest: false, transparent: true, opacity: 0.8 }),
    );

    debugMesh.name = "HitboxDebug";
    debugMesh.renderOrder = 999;
    node.add(debugMesh);

    node.position.copy(center);
    node.updateMatrixWorld(true);
    node.attach(this.object);

    return [
      new SceneNodeComponent(node),
      new TransformComponent(center),
      new StaticBodyComponent(),
      new ColliderAABBComponent(halfSize),
    ];
  }
}
