import Stats from 'stats.js';
import {
    World,
    Context,
    Container,
    SystemManager,
    defaultRenderer,
    defaultScene,
    defaultCamera,
    type Config,
    type Token,
    type Prefab,
} from '@/evolis/foundation';
import { Loader } from '@/evolis/filesystem';
import { AxesPrefab, GridPrefab } from '@/evolis/common';
import { PrefabManager } from '../managers/PrefabManager';

export class Application
{
    /**
     *
     */
    private static instance: Application | null = null;

    /**
     *
     */
    public readonly container: Container = new Container();

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
    public readonly stats: Stats = new Stats();

    /**
     *
     */
    public readonly systemManager: SystemManager = new SystemManager();

    /**
     *
     */
    public readonly prefabManager: PrefabManager = new PrefabManager();

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
     * @returns
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
    private setLoaded(): void
    {
        this.isLoaded = true;
    }

    /**
     * 
     * @returns
     */
    private getDeltaTime(): number
    {
        const currentTick = performance.now();
        const deltaTime = (currentTick - this.lastTick) / 1000;

        this.lastTick = currentTick;
        
        return deltaTime;
    }

    /**
     *
     */
    private loop = (): void =>
    {
        this.stats.begin();

        const dt = this.getDeltaTime();

        for (const system of this.systemManager.systems) {
            system.update({ deltaTime: dt });
        }

        this.context.makeTick();

        this.stats.end();

        requestAnimationFrame(this.loop);
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
     * @param token
     * @param service
     * @returns
     */
    public inject<T>(token: Token<T>, service: T): Application
    {
        this.container.bind<T>(token, service);

        return this;
    }

    /**
     * 
     * @param prefabs
     * @returns
     */
    public insert(...prefabs: Prefab[]): Application
    {
        this.world.insert(...prefabs);

        return this;
    }

    /**
     * 
     */
    public async start(): Promise<void>
    {
        await Promise.all([
            this.systemManager.load(this.context, this.world),
            this.prefabManager.load()
        ]);

        for (const system of this.systemManager.systems) {
            system.boot();
        }

        this.loop();

        this.setLoaded();
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
}
