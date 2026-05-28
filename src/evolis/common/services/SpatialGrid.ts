import type { EntityId } from '@/evolis/foundation';

type CellKey = string;

export class SpatialGrid
{
    /**
     * 
     */
    private cells: Map<CellKey, Set<EntityId>> = new Map();

    /**
     * 
     * @param cellSize
     */
    constructor(
        private readonly cellSize: number = 10
    ) {}

    /**
     * Convert world coords → cell coords
     * 
     * @param x
     * @param z 
     * @returns 
     */
    private toCell(x: number, z: number)
    {
        return {
            cx: Math.floor(x / this.cellSize),
            cz: Math.floor(z / this.cellSize)
        };
    }

    /**
     * 
     * @param cx
     * @param cz
     * @returns
     */
    private key(cx: number, cz: number): CellKey
    {
        return `${cx}:${cz}`;
    }

    /**
     * Insert entity as POINT (fast mode)
     * 
     * @param id
     * @param x
     * @param z 
     */
    public insertPoint(id: EntityId, x: number, z: number): void
    {
        const { cx, cz } = this.toCell(x, z);

        const key = this.key(cx, cz);

        if (! this.cells.has(key)) {
            this.cells.set(key, new Set());
        }

        this.cells.get(key)!.add(id);
    }

    /**
     * Insert entity as AABB (correct physics mode)
     * 
     * @param id
     * @param minX
     * @param minZ 
     * @param maxX 
     * @param maxZ 
     */
    public insertAABB(
        id: EntityId,
        minX: number,
        minZ: number,
        maxX: number,
        maxZ: number
    ): void
    {
        const { cx: x0, cz: z0 } = this.toCell(minX, minZ);
        const { cx: x1, cz: z1 } = this.toCell(maxX, maxZ);

        for (let cx = x0; cx <= x1; cx++) {
            for (let cz = z0; cz <= z1; cz++) {

                const key = this.key(cx, cz);

                if (! this.cells.has(key)) {
                    this.cells.set(key, new Set());
                }

                this.cells.get(key)!.add(id);
            }
        }
    }

    /**
     * Query nearby entities (9 cells around)
     * 
     * @param x
     * @param z
     * @returns 
     */
    public getNearby(x: number, z: number): EntityId[]
    {
        const result: EntityId[] = [];

        const { cx, cz } = this.toCell(x, z);

        for (let dx = -1; dx <= 1; dx++) {
            for (let dz = -1; dz <= 1; dz++) {

                const key = this.key(cx + dx, cz + dz);
                const cell = this.cells.get(key);

                if (cell) {
                    for (const id of cell) {
                        result.push(id);
                    }
                }
            }
        }

        return result;
    }

    /**
     * Query extended area (for AABB / capsule)
     * 
     * @param minX 
     * @param minZ 
     * @param maxX 
     * @param maxZ 
     * @returns 
     */
    public queryAABB(
        minX: number,
        minZ: number,
        maxX: number,
        maxZ: number
    ): EntityId[]
    {
        const result = new Set<EntityId>();

        const { cx: x0, cz: z0 } = this.toCell(minX, minZ);
        const { cx: x1, cz: z1 } = this.toCell(maxX, maxZ);

        for (let cx = x0; cx <= x1; cx++) {
            for (let cz = z0; cz <= z1; cz++) {

                const cell = this.cells.get(this.key(cx, cz));

                if (cell) {
                    for (const id of cell) {
                        result.add(id);
                    }
                }
            }
        }

        return [...result];
    }

    /**
     * 
     */
    public clear(): void
    {
        this.cells.clear();
    }
}
