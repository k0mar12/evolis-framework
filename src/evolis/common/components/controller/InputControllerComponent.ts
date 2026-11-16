import { Component } from "@/evolis/foundation";

export class InputControllerComponent extends Component {
  public moveX: number = 0;
  public moveZ: number = 0;

  public runHeld: boolean = false;
  public jumpHeld: boolean = false;
}
