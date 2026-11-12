export interface PhysicsVector {
  x: number;
  y: number;
  z: number;
}

export type ColliderDefinition =
  | { kind: 'box'; x: number; y: number; z: number }
  | { kind: 'capsule'; radius: number; halfHeight: number }
  | { kind: 'trimesh'; vertices: Float32Array; indices: Uint32Array; revision: number };

export interface PhysicsDefinition {
  kind: 'static' | 'dynamic';
  position: PhysicsVector;
  velocity?: PhysicsVector;
  gravityScale: number;
  collider: ColliderDefinition;
}
