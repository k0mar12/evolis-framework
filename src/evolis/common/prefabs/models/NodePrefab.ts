import { Component, type Prefab } from "@/evolis/foundation";
import { SceneNodeComponent, TransformComponent, ShadowComponent } from "@/evolis/common";
import { type Object3D } from "three";

export class NodePrefab implements Prefab {
  /**
   *
   * @param object
   */
  constructor(protected object: Object3D) {}

  /**
   *
   */
  public async components(): Promise<Component[]> {
    return [
      new SceneNodeComponent(this.object),
      new TransformComponent(this.object.position),
      new ShadowComponent({ cast: true, receive: true }),
    ];
  }
}
