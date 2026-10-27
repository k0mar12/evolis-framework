import {World, type PrefabsList, type Prefab} from '@/evolis/foundation';
import { ModelLoader, type FilePath } from '@/evolis/filesystem';
import { type Group, type Object3D } from 'three';

export abstract class Level
{
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
        protected prefabs: PrefabsList
    )
    {
    }

    /**
     *
     * @param node
     * @private
     */
    private getPrefabOfNode(node: Object3D): string | null
    {
        const str: string = node?.userData?.name ?? '';
        const match = str.match(/\[(.*?)]/);

        return match ? match[1] : null;
    }


    /**
     *
     * @param group
     * @private
     */
    private async parseScene(group: Group): Promise<void>
    {
        const prefabs: Prefab[] = [];

        group.traverse((node) => {
            if (node.isMesh) {
                const prefab = this.getPrefabOfNode(node);

                if (prefab !== null && this.prefabs.has(prefab)) {
                    const link = this.prefabs.get(prefab);

                    if (link === undefined) {
                        throw new Error('Prefab not found.');
                    }

                    prefabs.push(new link(node));
                }
            }
        });

        await this.world.insert(...prefabs);
    }

    /**
     *
     */
    public async load()
    {
        const result = await this.modelLoader.load(this.file);

        if (! result) {
            throw new Error(`Could not load model loader: ${this.file}`);
        }

        await this.parseScene(result.scene);
    }
}
