import { ComponentRegistry, type ComponentConstructor } from '@/evolis/foundation';

export abstract class Condition
{
    /**
     * 
     * @param types
     */
    constructor(
        public readonly types: ComponentConstructor[]
    )
    {

    }

    /**
     * 
     * @param entityMask
     * @param prevEntityMask 
     */
    public abstract matches(entityMask: bigint): boolean;

    /**
     *
     */
    public get mask(): bigint
    {
        return this.types.reduce((m, t) => m | ComponentRegistry.getBit(t.name), 0n);
    }
}
