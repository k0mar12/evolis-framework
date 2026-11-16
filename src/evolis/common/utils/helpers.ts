import { MeshBasicMaterial, type Material } from "three";

/**
 *
 * @returns
 */
export const createMeshDebugMaterials = (): Material => {
  return new MeshBasicMaterial({
    color: 0x00ff88,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
  });
}
