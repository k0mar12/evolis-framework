import { Component, type Prefab } from "@/evolis/foundation";
import { SceneNodeComponent, TransformComponent } from "@/evolis";
import { type Object3D } from "three";

export class StaticNodePrefab implements Prefab {
  /**
   *
   * @param object
   */
  constructor(protected object: Object3D) {}

  /**
   *
   */
  public async components(): Promise<Component[]> {
    return [new SceneNodeComponent(this.object), new TransformComponent(this.object.position)];
  }
}
