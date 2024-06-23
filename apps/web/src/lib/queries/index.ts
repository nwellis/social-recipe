import { tuple } from '@acme/util';

export const objToReactQueryKey = <T extends object>(
  obj: T,
  // Include every key even if the field isn't on the object to reproduce consistent behavior
  ...keys: (keyof T)[]
) => keys.map(key => tuple(key.toString() as string, obj[key]))
  // Order matters!
  .sort(([k1], [k2]) => k1.localeCompare(k2))
  .map(([k, v]) => `${k}=${v}`)