import './style.css';

import { Application } from '@/evolis';
import { BoxPrefab } from '@/prefabs/BoxPrefab';
import { DebugPrefab } from './prefabs/DebugPrefab';

const evolis = Application.create();

await evolis.load();

evolis.loop();

evolis.world.spawn(
    new DebugPrefab(),
    new BoxPrefab()
);
