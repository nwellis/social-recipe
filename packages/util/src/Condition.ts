
export function assert<T>(condition: T, message: (() => string) | string, ErrorCTOR = Error): NonNullable<T> {
  if (!condition) {
    throw new ErrorCTOR(typeof message === "function" ? message() : message)
  }
  return condition as NonNullable<T>
}