import '@/style.css';

import { Application, Keyboard, type InputDevice } from '@/evolis';
import { PlayerPrefab } from '@/prefabs/PlayerPrefab';
import { InputDeviceSymbol } from '@/symbols';
import { CameraPrefab } from '@/prefabs/CameraPrefab';
import { TerrainPrefab } from '@/prefabs/TerrainPrefab';
import { WallPrefab } from '@/prefabs/WallPrefab';

const evolis = Application.create({ debug: true });

evolis.container.set<InputDevice>(InputDeviceSymbol, new Keyboard());

await evolis.load();

evolis.loop();

evolis.world.insert(
    new CameraPrefab(),
    new TerrainPrefab(),
    new WallPrefab(),
    new PlayerPrefab(),
);
