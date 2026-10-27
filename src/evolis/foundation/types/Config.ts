import { Scene, WebGLRenderer, Camera } from 'three';
import { type LevelConstructor } from '@/evolis/foundation';

/**
 * 
 */
export type Config = Readonly<{
    canvas: string,
    debug: boolean,
    scene: () => Scene,
    renderer: (canvas: HTMLElement) => WebGLRenderer,
    camera: () => Camera,
    level: LevelConstructor | null
}>;
