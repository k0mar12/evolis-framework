import { Mesh, PlaneGeometry, MeshStandardMaterial } from 'three';
import {
    SceneNodeComponent,
    Component,
    TransformComponent,
    ColliderAABBComponent,
    StaticBodyComponent,
    RotationComponent,
    ShadowComponent,
    type Vec3,
    type Prefab,
} from '@/evolis';

export default class TerrainPrefab implements Prefab
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
        
        return new Mesh(geometry, material);
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
            new ShadowComponent({ receive: true }),
            new StaticBodyComponent(),
            new ColliderAABBComponent({ x: 25, y: 0.1, z: 25 })
        ];
    }
}
