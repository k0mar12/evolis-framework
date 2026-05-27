import {
    SceneNodeComponent,
    TransformComponent,
    VelocityComponent,
    PlayerControlledComponent,
    InputControllerComponent,
    SettingsControllerComponent,
    GravityComponent,
    TargetCameraComponent,
    Component,
    DynamicBodyComponent,
    ColliderAABBComponent,
    type Prefab,
} from '@/evolis';
import { BoxGeometry, MeshNormalMaterial, Mesh, type Object3D } from 'three';

export class PlayerPrefab implements Prefab
{
    /**
     * 
     * @param x
     * @param y 
     * @param z 
     */
    constructor(
        protected x: number = 0,
        protected y: number = 0,
        protected z: number = 0
    )
    {
    }

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
            new SceneNodeComponent(this.asset()),
            new TransformComponent(this.x, this.y, this.z),
            new VelocityComponent(),
            new GravityComponent(2),
            new InputControllerComponent(),
            new PlayerControlledComponent(),
            new SettingsControllerComponent(),
            new TargetCameraComponent(),
            new DynamicBodyComponent(),
            new ColliderAABBComponent(0.5, 0.5, 0.5)
        ];
    }
}
