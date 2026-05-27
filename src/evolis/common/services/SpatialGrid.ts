import type { EntityId } from '@/evolis/foundation';

export class SpatialGrid
{
    /**
     *
     */
    protected cells: Map<string, EntityId[]> = new Map();

    /**
     * 
     * @param cellSize
     */
    constructor(
        protected cellSize: number = 10
    )
    {
    }

    /**
     * 
     * @param x
     * @param z 
     * @returns 
     */
    private key(x: number, z: number): string
    {
        const cx = Math.floor(x / this.cellSize);
        const cz = Math.floor(z / this.cellSize);

        return `${cx}:${cz}`
    }

    /**
     * 
     * @param id
     * @param x 
     * @param z 
     */
    public insert(id: EntityId, x: number, z: number): void
    {
        const key = this.key(x, z);
        if (! this.cells.has(key)) {
            this.cells.set(key, []);
        }

        this.cells.get(key)!.push(id);
    }

    /**
     * 
     * @param x
     * @param z 
     * @returns 
     */
    public getNearby(x: number, z: number): EntityId[]
    {
        const result: EntityId[] = [];
        const cx = Math.floor(x / this.cellSize);
        const cz = Math.floor(z / this.cellSize);

        for (let dx = -1; dx <= 1; dx++) {
            for (let dz = -1; dz <= 1; dz++) {
                const key = `${cx + dx}:${cz + dz}`;
                const cell = this.cells.get(key);

                if (cell) {
                    result.push(...cell);
                }
            }
        }

        return result;
    }

    /**
     *
     */
    public clear(): void
    {
        this.cells.clear();
    }
}
