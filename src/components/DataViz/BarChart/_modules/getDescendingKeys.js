import * as R from "ramda"

export const getDescendingKeys = obj =>
  R.pipe(R.toPairs, R.sort(R.descend(R.prop(1))), R.map(R.prop(0)))(obj)
