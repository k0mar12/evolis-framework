import { GLTFLoader, type GLTF } from 'three/examples/jsm/Addons.js';

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
     * @param path
     */
    public async load(path: string): Promise<GLTF|undefined>
    {
        if (this.cache.has(path)) {
            return this.cache.get(path)
        }

        const model = await this.gltf.loadAsync(path);

        this.cache.set(path, model);

        return model;
    }
}
