export function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val))
}

export function numberRange(startOrEnd: number, end?: number): number[] {
  const s = typeof end === "number" ? startOrEnd : 0
  const e = typeof end === "number" ? end : startOrEnd

  const range = Array(e - s);

  for (let i = 0; i < range.length; i++) {
    range[i] = i + s
  }

  return range;
}