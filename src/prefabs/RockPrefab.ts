import {
    app,
    Component,
    SceneNodeComponent,
    type Prefab, type Vec3, TransformComponent
} from '@/evolis';
import { Group } from 'three';

export default class RockPrefab implements Prefab
{
    constructor(
        protected position: Vec3 = { x: 0, y: 0, z: 0 }
    )
    {
    }

    /**
     *
     * @private
     */
    private async asset(): Promise<Group>
    {
        const { scene } = await app().modelLoader.load('./rock.glb');

        return scene;
    }

    /**
     *
     */
    public async components(): Promise<Component[]>
    {
        const object = await this.asset();

        return [
            new SceneNodeComponent<Group>(object),
            new TransformComponent(this.position)
        ];
    }
}
