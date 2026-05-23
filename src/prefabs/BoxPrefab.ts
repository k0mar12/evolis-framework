import { BoxGeometry, MeshNormalMaterial, Mesh, type Object3D } from 'three';
import { MeshComponent, TransformComponent, Component, type Prefab } from '@/evolis';

export class BoxPrefab implements Prefab
{
    private asset(): Object3D
    {
        return new Mesh(
            new BoxGeometry(),
            new MeshNormalMaterial()
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
            new TransformComponent()
        ];
    }
}
