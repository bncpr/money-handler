import * as R from "ramda"
import * as d3 from "d3"

export const didFetchYear = R.curry(
  (data, year) => data && year && data[year] instanceof Object
)
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

const barChartPipe = R.curry((fns, data, year) =>
  R.pipe(
    extractMonthsOfYear(year),
    R.sortBy(R.prop("month")),
    R.map(R.pipe(...fns))
  )(data)
)

const monthlySumsPipe = barChartPipe([addSum, R.pick(["month", "sum"])])

const seriesPipe = (propName, data, year) =>
  barChartPipe(
    [addSeries(propName), R.pick(["month", "sums", "series"])],
    data,
    year
  )

const stackPipe = (propName, data, year) =>
  barChartPipe(
    [addSum, addSeries(propName), R.pick(["month", "sum", "sums", "series"])],
    data,
    year
  )

const barChartXScale = (data, width) =>
  d3
    .scaleBand()
    .domain(data.map(R.prop("month")))
    .range([0, width])
    .paddingInner(0.2)
    .paddingOuter(0.05)

const barChartScales = (data, width, height) => {
  return {
    xScale: barChartXScale(data, width),
    yScale: d3
      .scaleLinear()
      .domain([0, d3.max(data, R.prop("sum"))])
      .range([height, 0]),
  }
}

const subScaleRange = (scale, accessor) => [
  scale(accessor),
  scale(accessor) + scale.bandwidth(),
]

const barChartSeriesScales = (data, width, height) => {
  const xScale = barChartXScale(data, width)
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, R.pipe(R.prop("sums"), R.values, d3.max))])
    .range([height, 0])
  const subScales = R.zipObj(
    data.map(R.prop("month")),
    data.map(d =>
      d3
        .scaleBand()
        .domain(d.series.sort((a, b) => d.sums[b] - d.sums[a]))
        .range(subScaleRange(xScale, d.month))
    )
  )
  return {
    xScale,
    yScale,
    subScales,
  }
}

const barChartStackScales = (data, width, height) => {
  const { xScale, yScale } = barChartScales(data, width, height)
  const stackedData = d3
    .stack()
    .keys(R.pipe(R.map(R.prop("series")), R.flatten, R.uniq)(data))
    .value((d, key) => d.sums[key])(data)
  return {
    xScale,
    yScale,
    stackedData,
  }
}

const monthlySumsBars = (data, year, { innerWidth, innerHeight }) => {
  const chartData = monthlySumsPipe(data, year)
  const chartScales = barChartScales(chartData, innerWidth, innerHeight)
  return { chartData, chartScales }
}

const seriesSumsBars = R.curry(
  (propName, data, year, { innerWidth, innerHeight }) => {
    const chartData = seriesPipe(propName, data, year)
    const chartScales = barChartSeriesScales(chartData, innerWidth, innerHeight)
    return { chartData, chartScales }
  }
)

const stackedSumsBars = R.curry(
  (propName, data, year, { innerWidth, innerHeight }) => {
    const chartData = stackPipe(propName, data, year)
    const chartScales = barChartStackScales(chartData, innerWidth, innerHeight)
    return { chartData, chartScales }
  }
)

const barChartMap = new Map([
  ["000", monthlySumsBars],
  ["001", seriesSumsBars("category")],
  ["010", null], // nothing to stack
  ["011", stackedSumsBars("category")], // stacked categories
  ["100", seriesSumsBars("payer")],
  ["101", null],
  ["110", stackedSumsBars("payer")], // stacked payers
  ["111", null],
])

export const getChartType = ({ withPayers, withStacks, withCategories }) =>
  `${+withPayers}${+withStacks}${+withCategories}`

export const getChartDataAndScales = (data, year, dimensions, options) => {
  return barChartMap.get(getChartType(options))(data, year, dimensions)
}
