import { type Matrix4, type Object3D } from "three";
import { World, type PrefabsList, type Prefab, type LoadedModel } from "@/evolis/foundation";
import { ModelLoader, type FilePath } from "@/evolis/filesystem";

type Nodes = { object: Object3D; matrix: Matrix4; prefab: string }[];

export abstract class Level {
  /**
   *
   */
  abstract file: FilePath;

  /**
   *
   * @param world
   * @param modelLoader
   * @param prefabs
   */
  constructor(
    protected world: World,
    protected modelLoader: ModelLoader,
    protected prefabs: PrefabsList,
  ) {}

  /**
   *
   * @param node
   * @private
   */
  protected getPrefabOfNode(node: Object3D): string | null {
    const str: string = node?.userData?.name ?? "";
    const match = str.match(/\[(.*?)]/);

    return match ? match[1] : null;
  }

  /**
   *
   * @param scene
   * @private
   */
  protected collectNodesFromScene(scene: Object3D): Nodes {
    const nodes: Nodes = [];

    scene.updateWorldMatrix(true, true);

    scene.traverse((node) => {
      const prefab = this.getPrefabOfNode(node);

      if (prefab !== null && this.prefabs.has(prefab)) {
        nodes.push({ object: node, matrix: node.matrixWorld.clone(), prefab });
      }
    });

    return nodes;
  }

  /**
   *
   * @param model
   * @private
   */
  private async append(model: LoadedModel): Promise<void> {
    const prefabs: Prefab[] = [];

    const nodes = this.collectNodesFromScene(model.scene);

    for (const { object } of nodes) {
      object.removeFromParent();
    }

    for (const { object, matrix, prefab } of nodes) {
      object.matrix.copy(matrix);
      object.matrix.decompose(object.position, object.quaternion, object.scale);

      object.matrixAutoUpdate = false;

      object.updateWorldMatrix(false, true);

      const constructor = this.prefabs.get(prefab);

      if (!constructor) {
        throw new Error(`Prefab not found: ${prefab}`);
      }

      prefabs.push(new constructor(object));
    }

    await this.world.insert(...prefabs);
  }

  /**
   *
   */
  public async load() {
    const result = await this.modelLoader.load(this.file);

    if (!result) {
      throw new Error(`Could not load model loader: ${this.file}`);
    }

    await this.append(result);
  }
}
