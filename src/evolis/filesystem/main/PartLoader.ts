import type { OrderedSystem } from '../types/OrderedSystem';
import type { SystemConstructor } from '../../foundation/types/SystemConstructor';
import type { SystemModuleLoader } from '../types/SystemModuleLoader';

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
            Object.entries(modules).map(async ([path, loader]): Promise<OrderedSystem> => {
                const mod = await loader();
                const SystemClass = mod.default;

                return {
                    order: SystemClass.prototype.order,
                    constructor: SystemClass
                };
            })
        );

        systems.sort((a, b): number => a.order - b.order);

        return systems.map((system): SystemConstructor => system.constructor);
    }
}
