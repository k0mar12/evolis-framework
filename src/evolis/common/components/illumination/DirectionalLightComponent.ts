import { LightComponent } from "@/evolis/common";

export class DirectionalLightComponent extends LightComponent {
  public castShadow: boolean = true;
  public shadowMapSize: number = 1024 * 5;
  public shadowCameraSize: number = 100;
  public shadowBias = -0.0001;
}
