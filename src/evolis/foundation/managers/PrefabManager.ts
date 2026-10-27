import { SkeletonLoader, type ModuleLoader } from '@/evolis/filesystem';
import { StaticNodePrefab } from '@/evolis/common';
import { Collection, type PrefabsList, type PrefabConstructor } from '@/evolis/foundation';

export class PrefabManager
{
    /**
     *
     */
    public list: PrefabsList = new Map();

    /**
     *
     */
    protected readonly inbox: Collection<PrefabConstructor> = new Collection([
        StaticNodePrefab
    ]);

    /**
     *
     */
    public async load(): Promise<void>
    {
        const income = import.meta.glob('@/prefabs/**/*.{js,ts,mjs}') as ModuleLoader<PrefabConstructor>;

        const prefabs = await SkeletonLoader.load(income);

        this.inbox.merge(prefabs).forEach((prefab) => {
            this.list.set(prefab.name, prefab);
        });
    }
}
