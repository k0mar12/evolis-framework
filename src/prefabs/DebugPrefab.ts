import { AxesHelper } from 'three';
import { MeshComponent, Component, type Prefab } from '@/evolis';

export class DebugPrefab implements Prefab
{
    /**
     * 
     * @returns
     */
    public components(): Component[]
    {
        return [
            new MeshComponent(new AxesHelper(15))
        ];
    }
}
