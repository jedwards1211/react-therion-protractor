// @flow

/**
 * @return a value >= x and < x * 10 that divides evenly into a power of 10.
 */
export function niceCeiling(x: number): number {
  var floor = Math.pow(10, Math.floor(Math.log10(x)))
  if (floor >= x) {
    return floor
  }
  if (floor * 2 >= x) {
    return floor * 2
  }
  if (floor * 2.5 >= x) {
    return floor * 2.5
  }
  if (floor * 5 >= x) {
    return floor * 5
  }
  return floor * 10
}

/**
 * @return a nice increment that is either 4 or 5 times the given increment
 * (or its niceCeiling if it is not actually a nice increment).  When an
 * interval is subdivided by 4 or 5 ticks, a human can quickly see what
 * value a tick represents, whereas if an interval is divided by 10 or more
 * ticks it's a bit more difficult.
 */
export function largerNiceIncrement(increment: number): number {
  const floor = Math.pow(10, Math.floor(Math.log10(increment)))
  const factor = increment / floor
  // 1eX -> 5eX
  if (factor < 1.5) {
    return floor * 5
  }
  // 2eX -> 10eX
  // 2.5eX -> 10eX
  if (factor < 3) {
    return floor * 10
  }
  // 4eX -> 20eX
  // 5eX -> 20eX
  if (factor < 6) {
    return floor * 20
  }
  return floor * 50
}

/**
 * @return true iff increment divides some power of 10 evenly.
 */
export function isNiceIncrement(increment: number): boolean {
  increment = Math.abs(increment)
  var normalized = increment / Math.pow(10, Math.floor(Math.log10(increment)))
  return normalized === 1 || normalized === 2 || normalized === 2.5 || normalized === 5
}

/**
 * @returns an increment that:
 * - divides some power of 10 evenly
 * - satisfies: increment * unitsPerPixel > minTickSpacingPixels
 */
export function chooseNiceIncrement(unitsPerPixel: number, minTickSpacingPixels: number): number {
  if (unitsPerPixel < 0) return -chooseNiceIncrement(-unitsPerPixel, minTickSpacingPixels)
  return niceCeiling(minTickSpacingPixels * unitsPerPixel)
}

/**
 * Returns the greatest (closest to positive infinity) multiple of mod that is <= value.
 */
export function modFloor(value: number, mod: number, anchor?: number): number {
  if (anchor) return anchor + modFloor(value - anchor, mod)
  if (value < 0.0) return -modCeiling(-value, mod)
  mod = Math.abs(mod)
  return value - value % mod
}

/**
 * Returns the greatest (closest to positive infinity) multiple of mod that is < value.
 */
export function modLower(value: number, mod: number, anchor?: number): number {
  var result = modFloor(value, mod, anchor)
  return result < value ? result : result - mod
}

/**
 * Returns the least (closest to negative infinity) multiple of mod that is >= value.
 */
export function modCeiling(value: number, mod: number, anchor?: number): number {
  if (anchor) return anchor + modCeiling(value - anchor, mod)
  if (value < 0.0) return -modFloor(-value, mod)
  mod = Math.abs(mod)
  var rem = value % mod
  if (rem !== 0.0) value += mod - rem
  return value
}

/**
 * Returns the least (closest to negative infinity) multiple of mod that is > value.
 */
export function modHigher(value: number, mod: number, anchor?: number): number {
  var result = modCeiling(value, mod, anchor)
  return result > value ? result : result + mod
}

