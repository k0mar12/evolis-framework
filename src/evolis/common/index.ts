//-- Main
export { Action } from "./main/Action";

export { SampleAction } from "./actions/SampleAction";

//-- Basic Components
export { LightComponent } from "./components/LightComponent";
export { SceneNodeComponent } from "./components/SceneNodeComponent";
export { AnimationComponent } from "./components/general/AnimationComponent";

//-- Space components
export { Vec3Component } from "./components/Vec3Component";
export { TransformComponent } from "./components/space/TransformComponent";
export { VelocityComponent } from "./components/space/VelocityComponent";
export { RotationComponent } from "./components/space/RotationComponent";
export { InterpolatedTransformComponent } from "./components/space/InterpolatedTransformComponent";

//-- Camera components
export { FollowCameraComponent } from "./components/camera/FollowCameraComponent";

//-- Controller components
export { InputControllerComponent } from "./components/controller/InputControllerComponent";
export { MotionSettingsComponent } from "./components/controller/MotionSettingsComponent";
export { JumpStateComponent } from "./components/controller/JumpStateComponent";

//-- Light components
export { AmbientLightComponent } from "./components/illumination/AmbientLightComponent";
export { DirectionalLightComponent } from "./components/illumination/DirectionalLightComponent";
export { ShadowComponent } from "./components/illumination/ShadowComponent";

//-- Collider components
export { ColliderAABBComponent } from "./components/physics/ColliderAABBComponent";
export { ColliderCapsuleComponent } from "./components/physics/ColliderCapsuleComponent";
export { ColliderTrimeshComponent } from "./components/physics/ColliderTrimeshComponent";

//-- Physics components
export { DynamicBodyComponent } from "./components/physics/tags/DynamicBodyComponent";
export { StaticBodyComponent } from "./components/physics/tags/StaticBodyComponent";
export { GroundContactComponent } from "./components/physics/GroundContactComponent";

//-- Basic tag components
export { InSceneComponent } from "./components/tags/InSceneComponent";
export { RemoveSceneComponent } from "./components/tags/RemoveSceneComponent";
export { UnderControlComponent } from "./components/tags/UnderControlComponent";
export { TargetCameraComponent } from "./components/tags/TargetCameraComponent";

//-- Debug prefabs
export { AxesPrefab } from "./prefabs/debug/AxesPrefab";
export { GridPrefab } from "./prefabs/debug/GridPrefab";

export { NodePrefab } from "./prefabs/models/NodePrefab";
export { HitboxPrefab } from "./prefabs/models/HitboxPrefab";

//-- Basic systems
export { MovementSystem } from "./systems/MovementSystem";
export { RenderSystem } from "./systems/RenderSystem";
export { SceneSystem } from "./systems/SceneSystem";

//-- Physics systems
export { RegistrationPhysicsSystem } from "./systems/physics/RegistrationPhysicsSystem";
export { SyncPhysicsSystem } from "./systems/physics/SyncPhysicsSystem";
export { GroundingPhysicsSystem } from "./systems/physics/GroundingPhysicsSystem";

//-- Camera systems
export { FollowCameraSystem } from "./systems/camera/FollowCameraSystem";

//-- Light systems
export { BaseLightSyncSystem } from "./systems/illumination/BaseLightSyncSystem";
export { AmbientLightSyncSystem } from "./systems/illumination/AmbientLightSyncSystem";
export { DirectionalLightSyncSystem } from "./systems/illumination/DirectionalLightSyncSystem";
export { ShadowSyncSystem } from "./systems/illumination/ShadowSyncSystem";

//-- General systems
export { AnimationSystem } from "./systems/general/AnimationSystem";

//-- Basic types
export type { LightOptions } from "./types/LightOptions";
export type { ShadowOptions } from "./types/ShadowOptions";
export type { Speed } from "./types/Speed";
export type { Vec3 } from "./types/Vec3";

export * from "./utils/helpers";
