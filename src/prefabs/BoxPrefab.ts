import {
    MeshComponent,
    TransformComponent,
    VelocityComponent,
    PlayerControlledComponent,
    TargetCameraComponent,
    Component,
    type Prefab
} from '@/evolis';
import { BoxGeometry, MeshNormalMaterial, Mesh, type Object3D } from 'three';
import { InputComponent } from '@/components/controller/InputComponent';
import { SettingsComponent } from '@/components/controller/SettingsComponent';
import { GravityComponent } from '@/components/physics/GravityComponent';

export class BoxPrefab implements Prefab
{
    /**
     * 
     * @returns
     */
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
            new TransformComponent(),
            new VelocityComponent(),
            new GravityComponent(),
            new InputComponent(),
            new PlayerControlledComponent(),
            new SettingsComponent(),
            new TargetCameraComponent(),
        ];
    }
}
