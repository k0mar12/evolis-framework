import Stats from 'stats.js';
import {
    World,
    Context,
    Container,
    defaultRenderer,
    defaultScene,
    defaultCamera,
    type Config
} from '@/evolis/foundation';
import { Loader } from '@/evolis/filesystem';
import { AxesPrefab, GridPrefab } from '@/evolis/common';
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
        this.canvas = this.getCanvas();

        this.context = new Context(
            this.config.renderer(this.canvas),
            this.config.scene(),
            this.config.camera()
        );

        this.initStats();
        this.initDebug();
    }

    /**
     *
     */
    private initStats(): void
    {
        this.stats.showPanel(0);

        document.body.appendChild(this.stats.dom);
    }

    /**
     * 
     * @returns
     */
    private initDebug(): void
    {
        if (! this.config.debug) {
            return;
        }

        this.world.insert(
            new AxesPrefab(),
            new GridPrefab()
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
        (await this.loader.parts.loadSystems())
            .map((system) => new system(this.context, this.world))
            .sort((a, b): number => a.order - b.order)
            .forEach((system) => {
                this.world.addSystem(system);
            });
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
