import * as R from "ramda"

export const groupByProp = prop => R.groupBy(R.prop(prop))
export const getSums = R.map(R.pipe(R.map(R.prop("value")), R.sum))

export const getCategorySums = (init, arr = []) => {
  console.log(init, arr)
  return R.pipe(R.groupBy(R.prop("category")), getSums, R.mergeRight(init))(arr)
}

export const getCategorySumsOfMonths = (init, arr = []) =>
  R.pipe(groupByProp("month"), R.map(getCategorySums(init)))(arr)

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
export const sortAscend = R.sort(R.ascend(R.identity))

export const getPayerMonthFields = (arr = []) =>
  R.pipe(groupByProp("payer"), getSums, R.toPairs)(arr)
