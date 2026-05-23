import { Scene, WebGLRenderer, Camera, PerspectiveCamera } from 'three';

/**
 * 
 * @returns
 */
export const defaultScene = (): Scene => {
    return new Scene();
}

/**
 * 
 * @param canvas
 * @returns 
 */
export const defaultRenderer = (canvas: HTMLElement): WebGLRenderer => {
    const renderer =  new WebGLRenderer({ canvas, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    return renderer;
}

/**
 * 
 * @returns
 */
export const defaultCamera = (): Camera => {
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.z = 5;

    return camera;
}
