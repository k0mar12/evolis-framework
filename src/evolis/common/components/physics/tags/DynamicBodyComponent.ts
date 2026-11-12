import { Component } from '@/evolis/foundation';

export class DynamicBodyComponent extends Component
{
  /**
    *
    * @param gravityScale
    */
  constructor(
    public gravityScale = 1
  )
  {
    super();
  }
}
