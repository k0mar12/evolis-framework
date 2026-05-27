import type { SystemConstructor } from '@/evolis/foundation';

type SystemModule = { default: SystemConstructor };

export type SystemModuleLoader = Record<string, () => Promise<SystemModule>>;
