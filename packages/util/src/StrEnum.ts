export class StrEnum<T> {

  readonly values: readonly T[]

  constructor(values: T[]) {
    this.values = Object.freeze(
      Array.from(new Set(values))
    )
  }

  is(value: any): value is T {
    return value && this.values.includes(value)
  }

  add<O>(other: StrEnum<O>) {
    return new StrEnum([...this.values, ...other.values])
  }
}