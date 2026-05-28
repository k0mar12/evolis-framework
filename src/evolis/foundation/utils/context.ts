import {
    Scene,
    WebGLRenderer,
    Camera,
    PerspectiveCamera,
    PCFSoftShadowMap,
    Fog
} from 'three';

import {
    FollowCameraSystem,
    AmbientLightSyncSystem,
    DirectionalLightSyncSystem,
    CollisionAABBSystem,
    GravitySystem,
    MovementSystem,
    RenderSystem,
    SceneSystem
} from '@/evolis/common';

import type { SystemConstructor } from '@/evolis/foundation';

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
    renderer.shadowMap.type = PCFSoftShadowMap;

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
    CollisionAABBSystem,
    GravitySystem,
    MovementSystem,
    RenderSystem,
    SceneSystem
]);
