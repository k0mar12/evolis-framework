import RAPIER from '@dimforge/rapier3d-compat';
import type { ColliderDefinition } from './PhysicsDefinition';

export class ColliderFactory
{
  /**
   *
   * @param shape
   * @returns
   */
  public static create(shape: ColliderDefinition): RAPIER.ColliderDesc
  {
    switch (shape.kind) {
      case 'box':
        return RAPIER.ColliderDesc.cuboid(shape.x, shape.y, shape.z);
      case 'capsule':
        return RAPIER.ColliderDesc.capsule(shape.halfHeight, shape.radius);
      case 'trimesh':
        return RAPIER.ColliderDesc.trimesh(
            shape.vertices, shape.indices, RAPIER.TriMeshFlags.FIX_INTERNAL_EDGES
        );
    }
  }

  /**
   *
   * @param a
   * @param b
   * @returns
   */
  public static equals(a: ColliderDefinition, b: ColliderDefinition): boolean
  {
    switch (a.kind) {
      case 'box':
        return b.kind === 'box' && a.x === b.x && a.y === b.y && a.z === b.z;
      case 'capsule':
        return b.kind === 'capsule' && a.radius === b.radius && a.halfHeight === b.halfHeight;
      case 'trimesh':
        return b.kind === 'trimesh' && a.vertices === b.vertices
            && a.indices === b.indices && a.revision === b.revision;
    }
  }
}
