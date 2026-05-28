import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three';
import {
    SceneNodeComponent,
    Component,
    TransformComponent,
    ColliderAABBComponent,
    StaticBodyComponent,
    type Vec3,
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
        protected position: Vec3 = { x: 0, y: 0, z: 10 },
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
    private asset(): Mesh
    {
        const geometry = new BoxGeometry(this.width, this.height, this.depth);
        const material = new MeshStandardMaterial({ metalness: 0, roughness: 0.9 });
        const mesh = new Mesh(geometry, material);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }

    /**
     * 
     * @returns
     */
    public components(): Component[]
    {
        return [
            new SceneNodeComponent<Mesh>(this.asset()),
            new TransformComponent(this.position),
            new StaticBodyComponent(),
            new ColliderAABBComponent({
                x: this.width / 2,
                y: this.height / 2,
                z: this.depth / 2
            })
        ];
    }
}
