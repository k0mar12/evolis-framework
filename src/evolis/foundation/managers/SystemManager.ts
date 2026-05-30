import {
    SkeletonLoader,
    type ModuleLoader
} from '@/evolis/filesystem';

import {
    FollowCameraSystem,
    AmbientLightSyncSystem,
    DirectionalLightSyncSystem,
    ShadowSyncSystem,
    CollisionAABBSystem,
    GravitySystem,
    MovementSystem,
    RenderSystem,
    SceneSystem
} from '@/evolis/common';

import {
    Collection,
    System,
    Context,
    World,
    type SystemConstructor
} from '@/evolis/foundation';

export class SystemManager
{
    /**
     *
     */
    protected list: System[] = [];

    /**
     *
     */
    protected readonly inbox: Collection<SystemConstructor> = new Collection([
        FollowCameraSystem,
        AmbientLightSyncSystem,
        DirectionalLightSyncSystem,
        ShadowSyncSystem,
        CollisionAABBSystem,
        GravitySystem,
        MovementSystem,
        RenderSystem,
        SceneSystem
    ]);

    /**
     *
     */
    public get systems(): System[]
    {
        return this.list;
    }

    /**
     *
     */
    public async load(context: Context, world: World): Promise<void>
    {
        const income =  import.meta.glob('@/systems/**/*.{js,ts,mjs}') as ModuleLoader<SystemConstructor>;

        const systems = await SkeletonLoader.load(income);

        this.list = this.inbox.merge(systems)
            .toArray()
            .map((system) => new system(context, world))
            .sort((a, b): number => a.order - b.order);
    }
}
