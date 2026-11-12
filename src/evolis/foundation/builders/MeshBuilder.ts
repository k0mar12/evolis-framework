import { Mesh, Vector3, type Object3D } from 'three';

export class MeshBuilder
{
    /**
     *
     * @protected
     */
    protected vertices: number[] = [];

    /**
     *
     * @protected
     */
    protected indices: number[] = [];

    /**
     *
     */
    public get float32Verticies(): Float32Array
    {
        return new Float32Array(this.vertices);
    }

    /**
     *
     */
    public get uint32Indices(): Uint32Array
    {
        return new Uint32Array(this.indices);
    }

    /**
     *
     * @param object
     */
    constructor(
        protected readonly mesh: Object3D
    )
    {
        this.collect();
    }

    /**
     *
     */
    private collect(): void
    {
        const point = new Vector3();

        this.mesh.traverse((node) => {
            if (! (node instanceof Mesh)) {
                return;
            }

            const geometry = node.geometry;
            const positions = geometry.getAttribute('position');

            if (! positions) {
                return;
            }

            const offset = this.vertices.length / 3;

            for (let i = 0; i < positions.count; i++) {
                point.fromBufferAttribute(positions, i).applyMatrix4(node.matrixWorld);
                this.vertices.push(point.x, point.y, point.z);
            }

            const index = geometry.getIndex();
            const count = index ? index.count : positions.count;
            const mirrored = node.matrixWorld.determinant() < 0;

            for (let i = 0; i + 2 < count; i += 3) {
                const a = offset + (index ? index.getX(i) : i);
                const b = offset + (index ? index.getX(i + 1) : i + 1);
                const c = offset + (index ? index.getX(i + 2) : i + 2);

                this.indices.push(a, mirrored ? c : b, mirrored ? b : c);
            }
        });

        if (! this.indices.length) {
            throw new Error('Terrain must contain triangle mesh geometry.');
        }
    }
}
