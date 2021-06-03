import * as R from "ramda"

const groupByProp = prop => R.groupBy(R.prop(prop))
const groupEntriesOfProp = prop =>
  R.pipe(groupByProp(prop), R.map(R.objOf("entries")))

export const getInitialGroupedTree = R.applySpec({
  year: groupByProp("year"),
  payer: groupByProp("payer"),
  category: groupByProp("category"),
})

export const groupMonths = R.over(
  R.lensProp("year"),
  R.map(({ entries }) => ({
    entries,
    month: groupEntriesOfProp("month")(entries),
  }))
)

const getKeysOfProp = prop => R.pipe(R.prop(prop), R.keys, R.defaultTo([]))

export const getFields = R.applySpec({
  year: getKeysOfProp("year"),
  payer: getKeysOfProp("payer"),
  category: getKeysOfProp("category"),
  // month: R.pipe(R.prop("year"), R.map(getKeysOfProp("month"))),
})
