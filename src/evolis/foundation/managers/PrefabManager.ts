import { SkeletonLoader, type ModuleLoader } from '@/evolis/filesystem';
import { StaticModelPrefab } from '@/evolis/common';
import { Collection, type PrefabConstructor, type Prefab } from '@/evolis/foundation';

export class PrefabManager
{
    /**
     *
     */
    protected readonly container: Map<string, PrefabConstructor> = new Map();

    /**
     *
     */
    protected readonly inbox: Collection<PrefabConstructor> = new Collection([
        StaticModelPrefab
    ]);

    /**
     *
     */
    public async load(): Promise<void>
    {
        const income =  import.meta.glob('@/prefabs/**/*.{js,ts,mjs}') as ModuleLoader<PrefabConstructor>;

        const prefabs = await SkeletonLoader.load(income);

        this.inbox.merge(prefabs).forEach((prefab) => {
            this.container.set(prefab.name, prefab)
        });
    }

    /**
     * 
     * @param type
     * @param args 
     */
    public create(type: string, ...args: any[]): Prefab | null
    {
        const entity = this.container.get(type) ?? null;

        return entity ? new entity(args) : null;        
    }
}
