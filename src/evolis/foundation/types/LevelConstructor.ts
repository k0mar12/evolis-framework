import { Level } from '@/evolis/foundation';

export type LevelConstructor = new (...args: ConstructorParameters<typeof Level>) => Level;
