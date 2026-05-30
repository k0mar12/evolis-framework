import type { Token } from '@/evolis/foundation';

export class Container
{
    /**
     *
     */
    private services: Map<Token<unknown>, unknown> = new Map();

    /**
     * 
     * @param token
     * @param service 
     */
    public bind<T>(token: Token<T>, service: T): void
    {
        this.services.set(token, service);
    }

    /**
     * 
     * @param token
     * @returns 
     */
    public resolve<T>(token: Token<T>): T
    {
        const service = this.services.get(token);

        if (service === undefined) {
            throw new Error(`Service not found.`);
        }

        return service as T;
    }
}
