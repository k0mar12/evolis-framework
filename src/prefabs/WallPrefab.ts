import { Object3D, Mesh, BoxGeometry, MeshStandardMaterial } from 'three';
import {
    MeshComponent,
    Component,
    TransformComponent,
    ColliderAABBComponent,
    StaticBodyComponent,
    type Prefab
} from '@/evolis';

export class WallPrefab implements Prefab
{
    /**
     * 
     * @param width
     * @param height 
     * @param depth 
     * @param widthSegments 
     * @param heightSegments 
     * @param depthSegments 
     */
    constructor(
        protected x: number = 0,
        protected y: number = 0.5,
        protected z: number = -5,
        protected width: number = 5,
        protected height: number = 1,
        protected depth: number = 1,
    )
    {

    }

    /**
     * 
     * @returns
     */
    private asset(): Object3D
    {
        const geometry = new BoxGeometry(this.width, this.height, this.depth);
        const material = new MeshStandardMaterial({ metalness: 0, roughness: 0.9 });

        return new Mesh(
            geometry, material
        );
    }

    /**
     * 
     * @returns
     */
    public components(): Component[]
    {
        return [
            new MeshComponent(this.asset()),
            new TransformComponent(this.x, this.y, this.z),
            new StaticBodyComponent(),
            new ColliderAABBComponent(this.width / 2, this.height / 2, this.depth / 2)
        ];
    }
}
