export declare type RecordKey = string | number | symbol;
export declare type RecordValue<TRecord> = TRecord extends Record<any, infer TType> ? TType : never;
export declare type PartialRecord<K extends RecordKey, V> = Partial<Record<K, V>>;

type Lit = string | number | boolean | undefined | null | /*void |*/ {};
export const tuple = <T extends Lit[]>(...args: T) => args;

export function withType<TElement extends { __type: string }, TType extends TElement["__type"]>(elements: TElement[], type: TType): Extract<TElement, { __type: TType }>[] {
  return elements.filter(element => element.__type === type) as Extract<TElement, { __type: TType }>[]
}

export function arraySet<T extends bigint | number | boolean | string | symbol>(array: T[]) {
  return Array.from(new Set(array))
}

export function chunkArray<T>(array: T[], chunkSize: number) {
  if (!array) return []
  if (chunkSize < 1) return [array]

  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }

  return chunks
}

export function hasValue<K extends RecordKey, V>(record: PartialRecord<K, V>, key: K): boolean {
  return Object.prototype.hasOwnProperty.call(record, key) && record[key] !== null;
}

export function getValueOrDefaultTo<K extends RecordKey, V>(record: PartialRecord<K, V>, key: K, defaultValue: V) {
  if (!hasValue(record, key)) {
    record[key] = defaultValue;
  }

  return record[key]
}

export function getValueOrDefault<K extends RecordKey, V>(record: PartialRecord<K, V>, key: K, defaultValue: V) {
  if (!hasValue(record, key)) {
    return defaultValue
  }

  return record[key]
}

export function arrayToRecord<TKey extends RecordKey, TItem>(
  elements: TItem[],
  mkKey: (element: TItem) => TKey,
) {
  return elements.reduce<PartialRecord<TKey, TItem>>((record, item) => {
    record[mkKey(item)] = item
    return record;
  }, {})
}

export function extractFromRecord<
  TKey extends RecordKey,
  TItem,
  TExtract,
>(
  record: PartialRecord<TKey, TItem>,
  extract: (element: TItem) => TExtract,
) {
  return Object.keys(record).reduce<PartialRecord<TKey, TExtract>>((extracted, key) => {
    extracted[key] = extract(record[key])
    return extracted
  }, {})
}

export function arrayGroupBy<TKey extends RecordKey, TItem>(
  elements: TItem[],
  mkKey: (element: TItem) => TKey
) {
  return elements.reduce<PartialRecord<TKey, TItem[]>>((record, item) => {
    const key = mkKey(item)
    if (!record[key]) record[key] = []
    record[key].push(item)
    return record;
  }, {})
}