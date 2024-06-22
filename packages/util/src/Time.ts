export const timestamps = <T extends string>(when: number, ...fields: T[]) => {
  return fields.reduce((acc, field) => {
    acc[field] = when
    return acc
  }, {} as Record<T, number>)
}