import * as R from "ramda"

const extractMonthsOfYear = R.curry(year =>
  R.pipe(R.prop(year), R.prop("months"), R.values)
)
const entriesLensWithoutSetter = R.curry(setLens =>
  R.lens(R.pipe(R.prop("entries"), R.values), setLens)
)
const overEntriesLens = R.curry((setterLens, fn, obj) =>
  R.over(entriesLensWithoutSetter(setterLens), fn, obj)
)
const extractSum = R.pipe(R.map(R.prop("value")), R.sum)
const addSum = overEntriesLens(R.assoc("sum"), extractSum)

const extractPropSum = R.curry((propName, obj, propValue) =>
  R.pipe(
    R.prop("entries"),
    R.values,
    R.filter(o => o[propName] === propValue),
    R.map(R.prop("value")),
    R.sum
  )(obj)
)

const extractSeriesFromMonth = propName =>
  R.pipe(R.map(R.prop(propName)), R.uniq)

const addSeriesToMonth = propName =>
  overEntriesLens(R.assoc("series"), extractSeriesFromMonth(propName))

const extractSumsOfSeries = R.curry((propName, obj) =>
  R.zipObj(obj.series, R.map(extractPropSum(propName, obj), obj.series))
)

const addSumsOfSeries = R.curry((propName, obj) =>
  R.assoc("sums", extractSumsOfSeries(propName, obj), obj)
)

const addSeries = R.curry(propName =>
  R.pipe(addSeriesToMonth(propName), addSumsOfSeries(propName))
)

const extractStackSeriesSum = R.curry((propN1, propN2, propV1, propV2, obj) =>
  R.pipe(
    R.prop("entries"),
    R.values,
    R.filter(o => o[propN1] === propV1),
    R.filter(o => o[propN2] === propV2),
    R.map(R.prop("value")),
    R.sum
  )(obj)
)

const extractSeriesFromObj = propName =>
  R.pipe(R.prop("entries"), R.values, R.map(R.prop(propName)), R.uniq)

const extractSumsOfSeriesForSeries = (series1, series2, propN1, propN2, obj) =>
  series1.map(propV1 => ({
    name: propV1,
    sums: R.zipObj(
      series2,
      series2.map(propV2 =>
        extractStackSeriesSum(propN1, propN2, propV1, propV2, obj)
      )
    ),
  }))

const extractSumsOfStackSeries = R.curry((propN1, propN2, obj) => {
  const s1 = extractSeriesFromObj(propN1)(obj)
  const s2 = extractSeriesFromObj(propN2)(obj)
  return {
    ...obj,
    stackSeries: extractSumsOfSeriesForSeries(s1, s2, propN1, propN2, obj),
  }
})

const barChartPipe = R.curry((fns, data, year) =>
  R.pipe(
    extractMonthsOfYear(year),
    R.sortBy(R.prop("month")),
    R.map(R.pipe(...fns))
  )(data)
)

export const monthlySumsPipe = barChartPipe([addSum, R.pick(["month", "sum"])])

export const seriesPipe = (propName, data, year) =>
  barChartPipe(
    [addSeries(propName), R.pick(["month", "sums", "series"])],
    data,
    year
  )

export const stackPipe = (propName, data, year) =>
  barChartPipe(
    [addSum, addSeries(propName), R.pick(["month", "sum", "sums", "series"])],
    data,
    year
  )

export const stackedSeriesPipe = (propName1, propName2, data, year) =>
  barChartPipe(
    [
      addSeries(propName1),
      extractSumsOfStackSeries(propName1, propName2),
      R.pick(["month", "stackSeries", "series", "sums"]),
    ],
    data,
    year
  )
