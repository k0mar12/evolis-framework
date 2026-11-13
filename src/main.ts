import "@/style.css";

import { Application, Keyboard, type InputDevice } from "@/evolis";
import { InputDeviceSymbol } from "@/symbols";

import CameraPrefab from "@/prefabs/CameraPrefab";
import WallPrefab from "@/prefabs/WallPrefab";
import AmbientPrefab from "@/prefabs/illumination/AmbientPrefab";
import SunPrefab from "@/prefabs/illumination/SunPrefab";
import PlayerPrefab from "@/prefabs/PlayerPrefab";

import WorldLevel from "@/levels/WorldLevel";

const evolis = await Application.create({ debug: true });

evolis.inject<InputDevice>(InputDeviceSymbol, new Keyboard());

await evolis.world.insert(
  new CameraPrefab(),
  new PlayerPrefab({ x: 0, y: 2, z: 0 }),
  new AmbientPrefab(),
  new SunPrefab(),
  new WallPrefab(),
);

await evolis.start();

await evolis.loadLevel(WorldLevel);

// const model = await evolis.modelLoader.load('./bot.glb');
//
// console.log(model)
