import type { SystemModuleLoader } from '@/evolis/filesystem';
import type { SystemConstructor } from '@/evolis/foundation';

/**
 * Loading part of framework, like systems, entities
 *
 */
export class PartLoader
{
    /**
     * 
     * @returns
     */
    public async loadSystems(): Promise<SystemConstructor[]>
    {
        const modules = import.meta.glob('@/systems/**/*.{js,ts,mjs}') as SystemModuleLoader;

        const systems = await Promise.all(
            Object.entries(modules).map(async ([path, loader]): Promise<SystemConstructor> => {
                const mod = await loader();

                return mod.default;
            })
        );

        return systems;
    }
}
