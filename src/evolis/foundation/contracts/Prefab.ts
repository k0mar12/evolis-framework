import type { Component } from '../core/Component';

export interface Prefab
{
    /**
     *
     */
    components(): Component[];
}
