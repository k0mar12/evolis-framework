import { Scene, WebGLRenderer, Camera } from 'three';

/**
 * 
 */
export type Config = Readonly<{
    canvas: string,
    debug: boolean,
    scene: () => Scene,
    renderer: (canvas: HTMLElement) => WebGLRenderer,
    camera: () => Camera
}>;
