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
        const mesh = new Mesh(
            new BoxGeometry(),
            new MeshNormalMaterial()
        );

        mesh.castShadow = true;

        return mesh;
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
