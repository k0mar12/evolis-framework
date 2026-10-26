
import type { ModuleLoader } from '@/evolis/filesystem';

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
            Object.entries(list).map(async ([_path, loader]): Promise<T> => {
                const mod = await loader();
                return mod.default;
            })
        );
        
        return modules;
    }
}
