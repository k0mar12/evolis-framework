import { Condition } from '../Condition';

export class Without extends Condition
{
    /**
     * 
     * @param entityMask
     * @returns 
     */
    public matches(entityMask: bigint): boolean
    {
        return (entityMask & this.mask) === 0n;
    }
}