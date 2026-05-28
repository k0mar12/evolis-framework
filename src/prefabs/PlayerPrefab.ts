import {
    SceneNodeComponent,
    TransformComponent,
    ShadowComponent,
    VelocityComponent,
    PlayerControlledComponent,
    InputControllerComponent,
    SettingsControllerComponent,
    GravityComponent,
    TargetCameraComponent,
    Component,
    DynamicBodyComponent,
    ColliderAABBComponent,
    ColliderCapsule,
    type Prefab,
    type Vec3,
} from '@/evolis';
import { BoxGeometry, MeshNormalMaterial, Mesh } from 'three';

export class PlayerPrefab implements Prefab
{
    /**
     * 
     * @param x
     * @param y 
     * @param z 
     */
    constructor(
        protected position: Vec3 = { x: 0, y: 0, z: 0 }
    )
    {
    }

    /**
     * 
     * @returns
     */
    private asset(): Mesh
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
            new SceneNodeComponent<Mesh>(this.asset()),
            new TransformComponent(this.position),
            new ShadowComponent({ cast: true }),
            new VelocityComponent(),
            new GravityComponent(2),
            new InputControllerComponent(),
            new PlayerControlledComponent(),
            new SettingsControllerComponent(),
            new TargetCameraComponent(),
            new DynamicBodyComponent(),
            // new ColliderCapsule(0.4, 1.2),
            new ColliderAABBComponent({ x: 0.5, y: 0.5, z: 0.5 })
        ];
    }
}
