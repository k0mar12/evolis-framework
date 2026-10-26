import type { Component } from '@/evolis/foundation';

export interface Prefab
{
    /**
     *
     */
    components(): Promise<Component[]>;
}
