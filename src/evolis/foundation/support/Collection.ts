export class Collection<T> extends Set<T>
{
    /**
     * 
     * @returns
     */
    public first(): T | null
    {
        return this.values().next().value ?? null;
    }

    /**
     * 
     * @param key 
     * @returns 
     */
    public get(key: T): T | null
    {
        if (this.has(key)) {
            return key;
        }

        return null;
    }

    /**
     * 
     * @returns
     */
    public last(): T | null
    {
        let last: T | null = null;
        
        for (const item of this) {
            last = item;
        }

        return last;
    }

    /**
     * 
     * @param items
     * @returns 
     */
    public merge(...items: (T[] | Iterable<T>)[]): Collection<T>
    {
        const mergedMap = new Map<T, T>();
        
        for (const item of this) {
            mergedMap.set(item, item);
        }
        
        for (const itemGroup of items) {
            const iterable = Array.isArray(itemGroup) ? itemGroup : itemGroup;

            for (const item of iterable) {
                mergedMap.set(item, item);
            }
        }
        
        return new Collection<T>(Array.from(mergedMap.values()));
    }

    /**
     * 
     * @returns
     */
    public toArray(): T[]
    {
        return Array.from(this);
    }
}
