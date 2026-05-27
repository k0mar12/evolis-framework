import {
    Application,
    Container,
    With,
    Without,
    Any,
    type Context,
    type World,
    type ComponentConstructor
} from '@/evolis/foundation';

/**
 * 
 * @returns
 */
export const app = (): Application => Application.get();

/**
 * 
 * @returns
 */
export const context = (): Context => Application.get().context;

/**
 * 
 * @returns
 */
export const container = (): Container => Application.get().container;

/**
 * 
 * @returns
 */
export const world = (): World => Application.get().world;

/**
 * 
 * @param types
 * @returns 
 */
export const and = (...types: ComponentConstructor[]): With => new With(types);

/**
 * 
 * @param types
 * @returns 
 */
export const or = (...types: ComponentConstructor[]): Without => new Without(types);

/**
 * 
 * @param types
 * @returns 
 */
export const optinal = (...types: ComponentConstructor[]): Any => new Any(types);
