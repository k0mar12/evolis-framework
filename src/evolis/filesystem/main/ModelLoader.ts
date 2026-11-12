import { GLTFLoader, type GLTF } from 'three/examples/jsm/Addons.js';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { type LoadedModel } from '@/evolis/foundation';

export class ModelLoader
{
    /**
     *
     * @private
     */
    private gltf: GLTFLoader = new GLTFLoader();

    /**
     *
     * @private
     */
    private cache: Map<string, GLTF> = new Map();

    /**
     *
     * @private
     */
    private create(source: GLTF): LoadedModel
    {
        return {
            scene: clone(source.scene),
            animations: source.animations,
            userData: source.userData
        }
    }

    /**
     *
     * @param path
     */
    public async load(path: string): Promise<LoadedModel>
    {
        let model: GLTF | undefined = undefined;

        if (this.cache.has(path)) {
            model = this.cache.get(path);
        }

        try {
            if (! model) {
                model = await this.gltf.loadAsync(path);

                this.cache.set(path, model);
            }
        } catch (_error) {
            throw new Error('Error while loading model.');
        }

        return this.create(model);
    }
}
