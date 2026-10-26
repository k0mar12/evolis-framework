import { FollowCameraComponent, Component, type Prefab } from '@/evolis';

export default class CameraPrefab implements Prefab
{
    /**
     * 
     * @returns
     */
    public async components(): Promise<Component[]>
    {
        return [
            new FollowCameraComponent()
        ];
    }
}
