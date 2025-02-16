/* eslint-disable @typescript-eslint/no-explicit-any */
// From: https://catchts.com/range-numbers
export type ComputeRange<
  N extends number,
  Result extends Array<unknown> = [],
> = Result["length"] extends N ? Result : ComputeRange<N, [...Result, Result["length"]]>;

/**
 * Pick some keys from object
 */
export function pick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  let result: Partial<Pick<T, K>> = {};
  for (const key of keys) result = { ...result, [key]: obj[key] };
  return result as Pick<T, K>;
}

/**
 * Omit some keys from object
 */
export function omit<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  let result: Omit<T, K> = obj;
  for (const key of keys) {
    const { [key]: _, ...rest } = result;
    result = rest as Omit<T, K>;
  }
  return result;
}

export function blobToBase64(blob: Blob): Promise<string> {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve, reject) => {
    reader.onloadend = () => resolve((reader.result as string).split(",")[1]!);
    reader.onerror = (error) => reject(error);
  });
}

const NoParams = Symbol("No Parameters");

/**
 * Since Next Server Action is sequential, this class will batch/defer the server action for better performance
 *
 * Note: This class is for data query where only the latest response is used.
 */
export class BatchedDeferPromise<P extends any[], R> {
  #active: boolean = false;
  #params: P | typeof NoParams = NoParams;
  #target: (...args: P) => Promise<R>;
  #resolves: ((ret: R) => void)[] = [];
  #rejects: ((err: unknown) => void)[] = [];

  constructor(target: (...args: P) => Promise<R>) {
    this.#target = target;
  }

  #start(params: P) {
    this.#active = true;
    const waitingResolves = this.#resolves;
    const waitingRejects = this.#rejects;
    this.#resolves = [];
    this.#rejects = [];
    this.#target(...params)
      .then((ret) => {
        waitingResolves.forEach((fn) => fn(ret));
      })
      .catch((err) => {
        waitingRejects.forEach((fn) => fn(err));
      }).finally(() => {
        if(this.#params === NoParams) {
          this.#active = false;
        } else {
          const params = this.#params;
          this.#params = NoParams;
          this.#start(params);
        }
      });
  }

  call(...args: P): Promise<R> {
    if (!this.#active) {
      const result = new Promise<R>((resolve, reject) => {
        this.#resolves.push(resolve);
        this.#rejects.push(reject);
      });

      this.#start(args);

      return result;
    } else {
      this.#params = args;
      return new Promise((resolve, reject) => {
        this.#resolves.push(resolve);
        this.#rejects.push(reject);
      });
    }
  }
}
