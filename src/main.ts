import '@/style.css';

import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { Application, Keyboard, type InputDevice } from '@/evolis';
import { InputDeviceSymbol } from '@/symbols';

import CameraPrefab from '@/prefabs/CameraPrefab';
import TerrainPrefab from '@/prefabs/TerrainPrefab';
import WallPrefab from '@/prefabs/WallPrefab';
import AmbientPrefab from './prefabs/illumination/AmbientPrefab';
import SunPrefab from './prefabs/illumination/SunPrefab';
import PlayerPrefab from '@/prefabs/PlayerPrefab';

const evolis = Application
    .create({ debug: true })
    .inject<InputDevice>(InputDeviceSymbol, new Keyboard())
    .insert(
        new CameraPrefab(),
        new TerrainPrefab(),
        new WallPrefab(),
        new PlayerPrefab(),
        new AmbientPrefab(),
        new SunPrefab()
    );

await evolis.start();


// const loader = new GLTFLoader();


// const terrain = await loader.loadAsync('./with_col.glb');


// // console.log(terrain)

// evolis.context.scene.add(terrain.scene);

// terrain.scene.traverse((object) => {
//     // console.log(object);

//     // evolis.context.scene.add(object);
// });
