type Module<T> = { default: T };
type ModuleLoader<T> = Record<string, () => Promise<Module<T>>>;

export type { ModuleLoader };
