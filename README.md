# Evolis Framework

A small 3D project built with Three.js, an ECS architecture, and Rapier physics.

## Run

Node.js and npm are required. From the project root, run:

```sh
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Control

- `W` `A` `S` `D` — move
- `Shift` — run
- `Space` — jump

## Commands

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build
- `npm run lint` — lint the code
- `npm run fmt` - format the code

The application entry point is `src/main.ts`; the level is defined in `src/levels/WorldLevel.ts`.

## Project structure

- `src/evolis/foundation/` contains the ECS core: entities, queries, systems, scheduling, and physics integration.
- `src/evolis/common/` contains reusable framework pieces, including common components, systems, prefabs, and services.
- `src/components/` contains project-specific component data attached to entities. Components generally hold state or configuration; systems implement the behavior that reads and updates that data.
- `src/systems/` contains project-specific systems, such as keyboard input and character movement. Systems process entities that have the components they need.
- `src/prefabs/` contains reusable entity setups. A prefab assembles components and scene objects for things such as the player, camera, terrain, and lights.
- `src/levels/` defines the entities and prefabs that make up a scene or level.
- `public/` stores static assets such as 3D models and textures.

In this ECS setup, components describe entity data, systems operate on matching entities, and prefabs provide a convenient way to create entities with a predefined set of components.
