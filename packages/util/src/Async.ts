export function delay(ms: number) {
  return new Promise<void>(resolve => {
    setTimeout(resolve, ms)
  });
}

/**
 * https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
 */
/* eslint-disable */
export function throttle<TFunc extends Function>(func: TFunc, limit: number): TFunc {
  let lastFunc: NodeJS.Timeout
  let lastRan: number

  return function (this: any) {

    const context = this
    const args = arguments

    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function () {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  } as any
}
/* eslint-enable */