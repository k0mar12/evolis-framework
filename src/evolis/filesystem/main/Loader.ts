import { SkeletonLoader } from '@/evolis/filesystem';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export class Loader {
    /**
     * 
     */
    public skeleton: SkeletonLoader = new SkeletonLoader();

    /**
     *
     */
    public gltf: GLTFLoader = new GLTFLoader();
}
