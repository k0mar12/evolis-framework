import { Condition, With, Without, Any, type ComponentConstructor} from '@/evolis/foundation';

export class Filter
{
    /**
     *
     */
    private _cacheKey!: bigint;

    /**
     * 
     * @param conditions
     */
    constructor(
        private conditions: Condition[] = []
    )
    {
    }

    /**
     * 
     * @param types
     * @returns 
     */
    public with(...types: ComponentConstructor[]): Filter {
        this.conditions.push(new With(types));

        return this;
    }

    /**
     * 
     * @param types
     * @returns 
     */
    public without(...types: ComponentConstructor[]): Filter {
        this.conditions.push(new Without(types));

        return this;
    }

    /**
     * 
     * @param types
     * @returns 
     */
    public any(...types: ComponentConstructor[]): Filter {
        this.conditions.push(new Any(types));

        return this;
    }

    /**
     * 
     * @param entityMask
     * @returns 
     */
    public matches(entityMask: bigint): boolean {
        return this.conditions.every((c: Condition) => c.matches(entityMask));
    }

    /**
     *
     * @returns
     */
    public get cacheKey(): bigint
    {
        if (this._cacheKey === undefined) {
            this._cacheKey = this.conditions.reduce((key: bigint, c: Condition, i: number) => {
                return key | (c.mask << (BigInt(i) * 64n));
            }, 0n);
        }

        return this._cacheKey;
    }
}
