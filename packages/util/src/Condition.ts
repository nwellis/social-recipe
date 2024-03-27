
export function assert(condition: any, message: (() => string) | string, ErrorCTOR = Error) {
  if (!condition) {
    throw new ErrorCTOR(typeof message === "function" ? message() : message)
  }
}