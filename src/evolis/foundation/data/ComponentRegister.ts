export class ComponentRegistry
{
    /**
     *
     */
    private static map = new Map<string, bigint>();

    /**
     * 
     */
    private static nextBit = 0n;

    /**
     * 
     * @param type
     * @returns 
     */
    static getBit(type: string): bigint
    {
        if (! this.map.has(type)) {
            this.map.set(type, 1n << this.nextBit++);
        }

        return this.map.get(type)!;
    }
}
