import { AnimationClip, type Object3D } from 'three';

export type LoadedModel = {
    animations: AnimationClip[],
    scene: Object3D,
    userData: Record<string, any>;
};
