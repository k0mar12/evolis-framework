import { Mesh, PlaneGeometry, MeshStandardMaterial } from 'three';
import {
    SceneNodeComponent,
    Component,
    TransformComponent,
    ColliderAABBComponent,
    StaticBodyComponent,
    type Vec3,
    type Prefab,
    RotationComponent
} from '@/evolis';

export class TerrainPrefab implements Prefab
{
    /**
     * 
     * @param position
     */
    constructor(
        protected position: Vec3 = { x: 0, y: -0.0001, z: 0 }
    )
    {
    }

    /**
     * 
     * @returns
     */
    private asset(): Mesh
    {
        const geometry = new PlaneGeometry(50, 50);
        const material = new MeshStandardMaterial({ metalness: 0, roughness: 1 });
        const plane = new Mesh(geometry, material);

        plane.receiveShadow = true;

        return plane;
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
            new RotationComponent({ x: -Math.PI / 2 }),
            new StaticBodyComponent(),
            new ColliderAABBComponent({ x: 25, y: 0.1, z: 25 })
        ];
    }
}
