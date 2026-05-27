import type { Prefab } from '@/evolis/foundation';

export type PrefabConstructor = new(...args: any[]) => Prefab;
