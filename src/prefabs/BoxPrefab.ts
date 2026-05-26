import {
    MeshComponent,
    TransformComponent,
    VelocityComponent,
    PlayerControlledComponent,
    InputControllerComponent,
    SettingsControllerComponent,
    GravityComponent,
    TargetCameraComponent,
    Component,
    type Prefab
} from '@/evolis';
import { BoxGeometry, MeshNormalMaterial, Mesh, type Object3D } from 'three';

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
            new InputControllerComponent(),
            new PlayerControlledComponent(),
            new SettingsControllerComponent(),
            new TargetCameraComponent(),
        ];
    }
}
