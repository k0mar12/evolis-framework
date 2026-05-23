import { Application } from '../core/Application'
import type { Context } from '../core/Context'
import type { World } from '../core/World'

/**
 * 
 * @returns
 */
export const app = (): Application => Application.get()

/**
 * 
 * @returns
 */
export const context = (): Context => Application.get().context

/**
 * 
 * @returns
 */
export const world = (): World => Application.get().world
