import * as R from "ramda"

export const getMaxOfSubFields = R.pipe(
  R.map(R.prop(1)),
  R.chain(R.values),
  R.reduce(R.max, 0),
)
