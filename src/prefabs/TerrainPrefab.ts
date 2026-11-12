import { type Object3D } from 'three';
import {
    Component,
    SceneNodeComponent,
    TransformComponent,
    ColliderTrimeshComponent,
    StaticBodyComponent,
    ShadowComponent,
    MeshBuilder,
    type Prefab,
} from '@/evolis';

export default class TerrainPrefab implements Prefab
{
    constructor(
        protected source: Object3D,
    )
    {
    }

    public async components(): Promise<Component[]>
    {
        const meshBuilder = new MeshBuilder(this.source);

        return [
            new SceneNodeComponent(this.source),
            new TransformComponent(),
            new ShadowComponent({ receive: true }),
            new StaticBodyComponent(),
            new ColliderTrimeshComponent(meshBuilder.float32Verticies, meshBuilder.uint32Indices),
        ];
    }
}
