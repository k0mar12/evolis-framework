import { Object3D, Mesh, PlaneGeometry, MeshStandardMaterial } from 'three';
import {
    SceneNodeComponent,
    Component,
    TransformComponent,
    ColliderAABBComponent,
    StaticBodyComponent,
    type Prefab
} from '@/evolis';


export class TerrainPrefab implements Prefab
{
    /**
     * 
     * @returns
     */
    private asset(): Object3D
    {
        const geometry = new PlaneGeometry(50, 50);
        const material = new MeshStandardMaterial({ metalness: 0, roughness: 1 });
        const plane = new Mesh(geometry, material);

        plane.rotation.x = -Math.PI / 2;
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
            new SceneNodeComponent(this.asset()),
            new TransformComponent(0, -0.0001, 0),
            new StaticBodyComponent(),
            new ColliderAABBComponent(25, 0.1, 25)
        ];
    }
}
