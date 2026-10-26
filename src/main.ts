import '@/style.css';

import { Application, Keyboard, type InputDevice } from '@/evolis';
import { InputDeviceSymbol } from '@/symbols';

import CameraPrefab from '@/prefabs/CameraPrefab';
import TerrainPrefab from '@/prefabs/TerrainPrefab';
import WallPrefab from '@/prefabs/WallPrefab';
import AmbientPrefab from './prefabs/illumination/AmbientPrefab';
import SunPrefab from './prefabs/illumination/SunPrefab';
import PlayerPrefab from '@/prefabs/PlayerPrefab';
import RockPrefab from "@/prefabs/RockPrefab.ts";

const evolis = Application
    .create({ debug: true })
    .inject<InputDevice>(InputDeviceSymbol, new Keyboard());

await evolis.insert(
    new CameraPrefab(),
    new TerrainPrefab(),
    new WallPrefab(),
    new PlayerPrefab(),
    new AmbientPrefab(),
    new SunPrefab(),
    new RockPrefab(),
    new RockPrefab({ x: 5, y: 0, z: 0 })
);

await evolis.start();
