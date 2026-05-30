import {
    Scene,
    WebGLRenderer,
    Camera,
    PerspectiveCamera,
    PCFShadowMap,
    Fog
} from 'three';

import {
    FollowCameraSystem,
    AmbientLightSyncSystem,
    DirectionalLightSyncSystem,
    ShadowSyncSystem,
    CollisionAABBSystem,
    GravitySystem,
    MovementSystem,
    RenderSystem,
    SceneSystem
} from '@/evolis/common';

import type { PrefabConstructor, SystemConstructor } from '@/evolis/foundation';

/**
 * 
 * @returns
 */
export const defaultScene = (): Scene => {
    const scene = new Scene();

    scene.fog = new Fog(0x202020, 10, 35);

    return scene;
};

/**
 * 
 * @param canvas
 * @returns 
 */
export const defaultRenderer = (canvas: HTMLElement): WebGLRenderer => {
    const renderer = new WebGLRenderer({ canvas, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFShadowMap;

    return renderer;
};

/**
 * 
 * @returns
 */
export const defaultCamera = (): Camera => {
    return new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
};

/**
 * 
 * @returns 
 */
export const defaultSystems = (): SystemConstructor[] => ([
    FollowCameraSystem,
    AmbientLightSyncSystem,
    DirectionalLightSyncSystem,
    ShadowSyncSystem,
    CollisionAABBSystem,
    GravitySystem,
    MovementSystem,
    RenderSystem,
    SceneSystem
]);

/**
 * 
 * @returns
 */
export const defaultPrefabs = (): PrefabConstructor[] => ([

]);
