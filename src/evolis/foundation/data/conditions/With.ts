import { Condition } from '@/evolis/foundation';

export class With extends Condition
{
    /**
     * 
     * @param entityMask
     * @returns 
     */
    public matches(entityMask: bigint): boolean
    {
        return (entityMask & this.mask) === this.mask;
    }
}
