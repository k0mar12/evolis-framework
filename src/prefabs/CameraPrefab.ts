import { FollowCameraComponent, Component, type Prefab } from '@/evolis';

export default class CameraPrefab implements Prefab
{
    /**
     * 
     * @returns
     */
    public components(): Component[]
    {
        return [
            new FollowCameraComponent()
        ];
    }
}
