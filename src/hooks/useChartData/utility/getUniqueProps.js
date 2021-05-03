import * as R from "ramda"

const getUniqueProps = R.curry((prop, entries) =>
  R.pipe(R.map(R.prop(prop)), R.uniq)(entries)
)
export const getMonths = getUniqueProps("month")
export const getPayers = getUniqueProps("payer")
export const getCategories = getUniqueProps("category")
