import * as R from "ramda"

const getUniqueProps = R.curry((prop, entries) =>
  R.pipe(R.map(R.prop(prop)), R.uniq)(entries)
)
const getMonths = getUniqueProps("month")
export const getPayers = getUniqueProps("payer")
export const getCategories = getUniqueProps("category")

const getSum = R.pipe(R.map(R.prop("value")), R.sum)

const getSumOfMonth = (entries, month) =>
  R.pipe(R.filter(R.whereEq({ month })), getSum)(entries)

const getSumsOfProps = R.curry((prop, entries, month, propList) =>
  R.zipObj(
    propList,
    propList.map(p =>
      R.pipe(R.filter(R.whereEq({ month, [prop]: p })), getSum)(entries)
    )
  )
)
const getPayersSums = getSumsOfProps("payer")
const getCategoriesSums = getSumsOfProps("category")

const getSumsOfPayersByCategory = R.curry(
  (entries, month, payers, categories) =>
    R.zipObj(
      payers,
      payers.map(payer =>
        R.zipObj(
          categories,
          categories.map(category =>
            R.pipe(
              R.filter(R.whereEq({ month, payer, category })),
              getSum
            )(entries)
          )
        )
      )
    )
)

export const processData = entries => {
  const months = getMonths(entries)
  const payers = getPayers(entries)
  const categories = getCategories(entries)
  return months.map(month => {
    return {
      month,
      sum: getSumOfMonth(entries, month),
      byPayer: getPayersSums(entries, month, payers),
      byCategory: getCategoriesSums(entries, month, categories),
      byPayerAndCategory: getSumsOfPayersByCategory(
        entries,
        month,
        payers,
        categories
      ),
    }
  })
}
