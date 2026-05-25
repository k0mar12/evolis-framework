import { Application } from '../core/Application';
import { With } from '../data/conditions/With';
import { Without } from '../data/conditions/Without';
import { Any } from '../data/conditions/Any';

import type { Context } from '../core/Context';
import type { World } from '../core/World';
import type { ComponentConstructor as cc } from '../types/ComponentConstructor';

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
export const world = (): World => Application.get().world;

/**
 * 
 * @param types
 * @returns 
 */
export const and = (...types: cc[]): With => new With(types);

/**
 * 
 * @param types
 * @returns 
 */
export const or = (...types: cc[]): Without => new Without(types);


/**
 * 
 * @param types
 * @returns 
 */
export const optinal = (...types: cc[]): Any => new Any(types);
