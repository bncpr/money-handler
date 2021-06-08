import * as R from "ramda";

export const getDescendingKeys = R.pipe(
  R.toPairs,
  R.sort(R.descend(R.prop(1))),
  R.map(R.prop(0))
);
