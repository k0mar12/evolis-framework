import { Scene, WebGLRenderer, Camera } from 'three';

export class Context {
    constructor(
        public renderer: WebGLRenderer,
        public scene: Scene,
        public camera: Camera
    )
    {
    }

    /**
     *
     */
    public makeTick(): void
    {
        this.renderer.render(this.scene, this.camera);
    }
}