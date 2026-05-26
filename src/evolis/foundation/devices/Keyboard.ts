import type { InputDevice } from '../contracts/InputDevice'

export class Keyboard implements InputDevice
{
    /**
     * 
     */
    private readonly keys: Set<string> = new Set();

    /**
     *
     */
    constructor()
    {
        window.addEventListener('keydown', e => this.keys.add(e.code));
        window.addEventListener('keyup', e => this.keys.delete(e.code));
    }

    /**
     * 
     * @param key
     * @returns 
     */
    public isPressed(key: string): boolean
    {
        return this.keys.has(key);
    }
}
