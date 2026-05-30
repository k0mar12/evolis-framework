
import type { ModuleLoader } from '@/evolis/filesystem';
// import type { SystemConstructor, PrefabConstructor } from '@/evolis/foundation';

/**
 * Loading part of framework, like systems, entities
 *
 */
export class SkeletonLoader
{
    /**
     * 
     * @param globPattern
     * @returns 
     */
    public static async load<T>(list: ModuleLoader<T>): Promise<T[]>
    {   
        const modules = await Promise.all(
            Object.entries(list).map(async ([path, loader]): Promise<T> => {
                const mod = await loader();
                return mod.default;
            })
        );
        
        return modules;
    }

    /**
     * 
     * @returns
     */
    // public async loadSystems(): Promise<SystemConstructor[]>
    // {
    //     return this.load(
    //         import.meta.glob('@/systems/**/*.{js,ts,mjs}') as ModuleLoader<SystemConstructor>
    //     );
    // }

    /**
     * 
     * @returns
     */
    // public async loadPrefabs(): Promise<PrefabConstructor[]>
    // {
    //     return this.load(
    //         import.meta.glob('@/prefabs/**/*.{js,ts,mjs}') as ModuleLoader<PrefabConstructor>
    //     );
    // }
}
