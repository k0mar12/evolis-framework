import { Condition } from '@/evolis/foundation';

export class Any extends Condition
{
    /**
     * 
     * @param entityMask
     * @returns 
     */
    public matches(entityMask: bigint): boolean
    {
        return this.mask === 0n || (entityMask & this.mask) !== 0n;
    }
}
