import { Object3D, Mesh, PlaneGeometry, MeshStandardMaterial } from 'three';
import { MeshComponent, Component, TransformComponent, type Prefab } from '@/evolis';

export class TerrainPrefab implements Prefab
{
    private asset(): Object3D
    {
        const geometry = new PlaneGeometry(50, 50);
        const material = new MeshStandardMaterial({ metalness: 0, roughness: 1 });
        const plane = new Mesh(geometry, material);

        plane.rotation.x = -Math.PI / 2;

        return plane;
    }

    /**
     * 
     * @returns
     */
    public components(): Component[]
    {
        return [
            new MeshComponent(this.asset()),
            new TransformComponent()
        ];
    }
}
