import * as R from "remeda"

export function countBy<T>(value: readonly T[], key: keyof T) {
  return R.pipe(
    value,
    R.groupBy(R.prop<T, keyof T>(key)),
    R.mapValues(arr => arr.length),
  )
}
