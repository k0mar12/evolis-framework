import { LightComponent } from '@/evolis/common';

export class DirectionalLightComponent extends LightComponent
{
    public castShadow: boolean = true;
    public shadowMapSize: number = 1024;
    public shadowCameraSize: number = 15;
    public shadowBias = -0.0002;
}
