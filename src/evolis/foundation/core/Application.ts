import Stats from 'stats.js';
import { World } from './World';
import { Context } from './Context';
import { Loader } from '../../filesystem/main/Loader';
import { defaultRenderer, defaultScene, defaultCamera } from '../utils/context';
import { Container } from './Container';

import type { Config } from '../types/Config';

export class Application
{
    /**
     *
     */
    private static instance: Application | null = null;

    /**
     * 
     */
    public readonly world: World = new World();

    /**
     *
     */
    public readonly loader: Loader = new Loader();

    /**
     *
     */
    public readonly container: Container = new Container();

    /**
     *
     */
    public readonly stats: Stats = new Stats();

    /**
     *
     */
    public readonly context: Context;

    /**
     * 
     */
    public readonly canvas: HTMLElement;

    /**
     * 
     */
    public lastTick: DOMHighResTimeStamp = performance.now()

    /**
     *
     */
    protected isLoaded: boolean = false


    /**
     * 
     * @param config
     */
    constructor(
        protected config: Config
    )
    {
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);

        this.canvas = this.getCanvas();

        this.context = new Context(
            this.config.renderer(this.canvas),
            this.config.scene(),
            this.config.camera()
        );
    }

    /**
     *
     */
    private getCanvas(): HTMLElement
    {
        const canvas = document.getElementById(this.config.canvas);

        if (! (canvas instanceof HTMLElement)) {
            throw new Error('Canvas not found');
        }

        return canvas;
    }

    /**
     * 
     */
    private async loadSystems(): Promise<void>
    {
        for (const system of await this.loader.parts.loadSystems()) {
            this.world.addSystem(
                new system(this.context, this.world)
            );
        }

        for (const system of this.world.getSystems()) {
            system.boot();
        }

        console.log(this.world.getSystems());
    }

    /**
     *
     */
    private async setLoaded(): Promise<void>
    {
        this.isLoaded = true;
    }

    /**
     * 
     * @returns
     */
    public async load(): Promise<void>
    {
        await Promise.all([
            this.loadSystems(),
            this.setLoaded()
        ]);
    }

    /**
     *
     */
    protected getDeltaTime(): number
    {
        const currentTick = performance.now();
        const deltaTime = (currentTick - this.lastTick) / 1000;

        this.lastTick = currentTick;
        
        return deltaTime;
    }

    /**
     * 
     * @returns
     */
    public static defaultConfig(): Config
    {
        return {
            canvas: 'game',
            debug: false,
            renderer: defaultRenderer,
            scene: defaultScene,
            camera: defaultCamera
        };
    }

    /**
     * 
     * @param config
     * @returns 
     */
    public static create(config: Partial<Config> = {}): Application
    {
        if (Application.instance) {
            throw new Error('Engine already created');
        }

        Application.instance = new Application({ ...Application.defaultConfig(), ...config });

        return Application.instance;
    }

    /**
     * 
     * @returns
     */
    public static get(): Application
    {
        if (! Application.instance) {
            throw new Error('Engine not created');
        }

        return Application.instance;
    }

    /**
     *
     */
    public static reset(): void
    {
        Application.instance = null;
    }

    /**
     *
     */
    public loop = (): void =>
    {
        this.stats.begin();

        const dt = this.getDeltaTime();

        for (const system of this.world.getSystems()) {
            system.update({ deltaTime: dt });
        }

        this.context.makeTick();

        this.stats.end();

        requestAnimationFrame(this.loop);
    }
}
