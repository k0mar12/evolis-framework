import { type LevelConstructor } from '@/evolis/foundation';

export class LevelManager
{
    /**
     *
     * @protected
     */
    protected isLoaded: boolean = false;

    /**
     *
     * @protected
     */
    protected current: LevelConstructor | null = null;

    /**
     *
     */
    public isPresented(): boolean
    {
        return this.current !== null;
    }

    /**
     *
     */
    public get(): LevelConstructor | null
    {
        return this.current;
    }
}
