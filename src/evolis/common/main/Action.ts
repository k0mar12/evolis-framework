export abstract class Action<TResult = unknown>
{
  /**
   *
   * @returns
   */
  abstract handle(): TResult;

  /**
   *
   * @param this
   * @param args
   * @returns
   */
  public static do<
    TArgs extends unknown[],
    TResult,
    T extends Action<TResult>
  >(
    this: new (...args: TArgs) => T, ...args: TArgs
  ): TResult
  {
    return new this(...args).handle();
  }
}
