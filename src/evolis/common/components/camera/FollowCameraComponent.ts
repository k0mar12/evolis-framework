import { Component } from '@/evolis/foundation';

export class FollowCameraComponent extends Component
{
    public yaw: number = 0;
    public pitch: number = 0.3;
    public distance: number = 5;
    public height: number = 2;

    public minPitch: number = -0.2;
    public maxPitch: number = 0.8;

    public lerpSpeed: number = 10;

    public lookAtOffsetY: number = 1;
}
