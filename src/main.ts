import '@/style.css';

import { Application, Keyboard, type InputDevice } from '@/evolis';
import { PlayerPrefab } from '@/prefabs/PlayerPrefab';
import { InputDeviceSymbol } from '@/symbols';
import { CameraPrefab } from '@/prefabs/CameraPrefab';
import { TerrainPrefab } from '@/prefabs/TerrainPrefab';
import { WallPrefab } from '@/prefabs/WallPrefab';
import { AmbientPrefab } from './prefabs/illumination/AmbientPrefab';
import { SunPrefab } from './prefabs/illumination/SunPrefab';

const evolis = Application
    .create({ debug: true })
    .register<InputDevice>(InputDeviceSymbol, new Keyboard())
    .insert(
        new CameraPrefab(),
        new TerrainPrefab(),
        new WallPrefab(),
        new PlayerPrefab(),
        new AmbientPrefab(),
        new SunPrefab()
    );

await evolis.start();
