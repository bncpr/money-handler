import * as R from "ramda"

export const getDomainXAlphanumerical = R.pipe(
  R.map(R.prop(0)),
  R.sortBy(R.identity),
)
export const getDomainXDescendingValue = R.pipe(
  R.sort(R.descend(R.prop(1))),
  R.map(R.prop(0)),
)
