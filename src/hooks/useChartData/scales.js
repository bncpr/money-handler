import * as R from "ramda"
import * as d3 from "d3"

const barChartXScale = (data, width) =>
  d3
    .scaleBand()
    .domain(data.map(R.prop("month")))
    .range([0, width])
    .paddingInner(0.2)
    .paddingOuter(0.05)

export const barChartScales = (data, width, height) => {
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

export const barChartSeriesScales = (data, width, height) => {
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

const extractSeriesKeysUnique = R.pipe(
  R.map(R.prop("series")),
  R.flatten,
  R.uniq
)

export const barChartStackScales = (data, width, height) => {
  const { xScale, yScale } = barChartScales(data, width, height)
  const stackedData = d3
    .stack()
    .keys(extractSeriesKeysUnique(data))
    .value((d, key) => d.sums[key])(data)
  return {
    xScale,
    yScale,
    stackedData,
  }
}

export const barChartStackSeriesScales = (data, width, height) => {
  const { xScale, yScale, subScales } = barChartSeriesScales(
    data,
    width,
    height
  )
  const keys = R.pipe(
    R.map(R.prop("stackSeries")),
    R.flatten,
    R.map(R.pipe(R.prop("sums"), R.keys)),
    R.flatten,
    R.uniq
  )(data)

  const stackedSeriesData = data.map(m =>
    d3
      .stack()
      .keys(keys)
      .value((d, key) => d.sums[key])(m.stackSeries)
  )
  return {
    xScale,
    yScale,
    stackedSeriesData,
    subScales,
  }
}
