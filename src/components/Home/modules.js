import * as R from "ramda"

export function getAverages(subField, yearFields) {
  return R.zipObj(
    subField,
    subField.map(key =>
      R.pipe(
        R.map(R.path([1, key])),
        R.converge(R.divide, [R.sum, R.length]),
        Math.round,
        R.defaultTo(0),
      )(yearFields),
    ),
  )
}
