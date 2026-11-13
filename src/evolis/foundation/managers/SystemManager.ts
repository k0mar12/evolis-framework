import { SkeletonLoader, type ModuleLoader } from "@/evolis/filesystem";

import {
  FollowCameraSystem,
  AmbientLightSyncSystem,
  DirectionalLightSyncSystem,
  ShadowSyncSystem,
  PhysicsRegistrationSystem,
  PhysicsSyncSystem,
  CharacterGroundingSystem,
  MovementSystem,
  AnimationSystem,
  RenderSystem,
  SceneSystem,
} from "@/evolis/common";

import {
  Collection,
  System,
  SystemUpdateMode,
  Context,
  World,
  type SystemConstructor,
} from "@/evolis/foundation";

export class SystemManager {
  /**
   *
   */
  protected list: System[] = [];

  /**
   *
   * @private
   */
  private fixedList: System[] = [];

  /**
   *
   * @private
   */
  private frameList: System[] = [];

  /**
   *
   */
  protected readonly inbox: Collection<SystemConstructor> = new Collection([
    FollowCameraSystem,
    AmbientLightSyncSystem,
    DirectionalLightSyncSystem,
    ShadowSyncSystem,
    PhysicsRegistrationSystem,
    PhysicsSyncSystem,
    CharacterGroundingSystem,
    MovementSystem,
    AnimationSystem,
    RenderSystem,
    SceneSystem,
  ]);

  /**
   *
   */
  public get simulationSystems(): readonly System[] {
    return this.fixedList;
  }

  /**
   *
   */
  public get frameSystems(): readonly System[] {
    return this.frameList;
  }

  /**
   *
   */
  public get systems(): System[] {
    return this.list;
  }

  /**
   *
   */
  public async load(context: Context, world: World): Promise<void> {
    const income = import.meta.glob(
      "@/systems/**/*.{js,ts,mjs}",
    ) as ModuleLoader<SystemConstructor>;

    const systems = await SkeletonLoader.load(income);

    this.list = this.inbox
      .merge(systems)
      .toArray()
      .map((system) => new system(context, world))
      .sort((a, b): number => a.order - b.order);

    this.fixedList = this.list.filter((system) => system.updateMode === SystemUpdateMode.Fixed);
    this.frameList = this.list.filter((system) => system.updateMode === SystemUpdateMode.Frame);
  }
}
