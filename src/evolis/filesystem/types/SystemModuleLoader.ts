import type { SystemConstructor } from '../../foundation/types/SystemConstructor'

type SystemModule = { default: SystemConstructor };

export type SystemModuleLoader = Record<string, () => Promise<SystemModule>>;
