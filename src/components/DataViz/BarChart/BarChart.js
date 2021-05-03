import { createRef, useEffect, useMemo, useState } from "react"
import { Chart } from "../Chart"

import * as R from "ramda"
import * as d3 from "d3"

const getUniqueProps = R.curry((prop, entries) =>
  R.pipe(R.map(R.prop(prop)), R.uniq)(entries)
)
const getMonths = getUniqueProps("month")
const getPayers = getUniqueProps("payer")
const getCategories = getUniqueProps("category")

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

const processData = entries => {
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
const propMonth = R.map(R.prop("month"))
const propSum = R.map(R.prop("sum"))
const maxSumMonth = R.pipe(propSum, d3.max)
const propCategoryValues = R.map(R.pipe(R.prop("byCategory"), R.values))
const propPayerValues = R.map(R.pipe(R.prop("byPayer"), R.values))
const maxCategorySum = R.pipe(propCategoryValues, R.flatten, d3.max)
const maxPayerSum = R.pipe(propPayerValues, R.flatten, d3.max)
const getSortedMonths = R.pipe(propMonth, R.sortBy(R.identity))

const getXScaleForMonths = (chartData, innerWidth) =>
  d3
    .scaleBand()
    .domain(getSortedMonths(chartData))
    .range([0, innerWidth])
    .padding(0.1)

const getYScale = (innerHeight, maxDomain) =>
  d3.scaleLinear().domain([0, maxDomain]).range([innerHeight, 0])

const processDataAndXScale = (entries, innerWidth) => {
  const chartData = processData(entries)
  const xScale = getXScaleForMonths(chartData, innerWidth)
  return { chartData, xScale }
}

const singleMonthlyRects = (chartData, xScale, yScale, innerHeight) =>
  chartData.map(m => {
    const { month, sum } = m
    return {
      props: {
        key: month,
        x: xScale(month),
        y: yScale(sum),
        width: xScale.bandwidth(),
        height: innerHeight - yScale(sum),
        ref: createRef(),
      },
      month,
      tooltip: `${month}: ${d3.format(",d")(sum)}`,
    }
  })

const getSeriesKeysDescending = R.curry((seriesKey, month) => {
  const seriesObj = month[seriesKey]
  return R.pipe(R.keys, R.sort(R.descend(key => seriesObj[key])))(seriesObj)
})
const getSeriesCategoriesDescending = getSeriesKeysDescending("byCategory")
const getSeriesPayersDescending = getSeriesKeysDescending("byPayer")

const getSubScale = (series, x, bandwidth) =>
  d3
    .scaleBand()
    .domain(series)
    .range([x, x + bandwidth])

const seriesRects = R.curry(
  (
    seriesKey,
    seriesName,
    getKeys,
    chartData,
    xScale,
    yScale,
    innerHeight,
    colors
  ) => {
    const rects = []
    chartData.forEach(m => {
      const { month } = m
      const series = getKeys(m)
      const subScale = getSubScale(series, xScale(month), xScale.bandwidth())
      series.forEach(prop => {
        const sum = m[seriesKey][prop]
        const y = yScale(sum)
        rects.push({
          props: {
            key: month + prop,
            x: subScale(prop),
            y,
            width: subScale.bandwidth(),
            height: innerHeight - y,
            fill: colors[prop],
            ref: createRef(),
          },
          month,
          [seriesName]: prop,
          tooltip: `${prop}: ${d3.format(",d")(sum)}`,
        })
      })
    })
    return rects
  }
)

const seriesCategoryRects = seriesRects(
  "byCategory",
  "category",
  getSeriesCategoriesDescending
)

const seriesPayerRects = seriesRects(
  "byPayer",
  "payer",
  getSeriesPayersDescending
)

const singleMonthlySumsBars = (entries, innerWidth, innerHeight) => {
  const { chartData, xScale } = processDataAndXScale(entries, innerWidth)
  const yScale = getYScale(innerHeight, maxSumMonth(chartData))
  const rects = singleMonthlyRects(chartData, xScale, yScale, innerHeight)
  return { chartData, xScale, yScale, rects }
}

const choosePayerColors = colors => colors.payerColors
const chooseCategoryColors = colors => colors.categoryColors

const seriesPropSumsBars = R.curry(
  (maxFn, rectsFn, colorChooser, entries, innerWidth, innerHeight, colors) => {
    const pickedColors = colorChooser(colors)
    const { chartData, xScale } = processDataAndXScale(entries, innerWidth)
    const yScale = getYScale(innerHeight, maxFn(chartData))
    const rects = rectsFn(chartData, xScale, yScale, innerHeight, pickedColors)
    return { chartData, xScale, yScale, rects }
  }
)
const seriesCategorySumsBars = seriesPropSumsBars(
  maxCategorySum,
  seriesCategoryRects,
  chooseCategoryColors
)
const seriesPayerSumsBars = seriesPropSumsBars(
  maxPayerSum,
  seriesPayerRects,
  choosePayerColors
)

const getStack = R.curry((propKey, keys, data) =>
  d3
    .stack()
    .keys(keys)
    .value((d, key) => d[propKey][key])
    .order(d3.stackOrderDescending)(data)
)

const getCategoryStack = getStack("byCategory")
const getPayerStack = getStack("byPayer")

const stackRects = R.curry(
  (stackFn, propKey, propName, keys, chartData, xScale, yScale, colors) => {
    const rects = []
    const stacked = stackFn(keys, chartData)
    stacked.forEach(series => {
      series.forEach(month => {
        const [y1, y2] = month
        if (isNaN(y1) || isNaN(y2)) return null
        const x = month.data.month
        const key = series.key
        rects.push({
          props: {
            key: x + key,
            x: xScale(x),
            y: yScale(y2),
            width: xScale.bandwidth(),
            height: yScale(y1) - yScale(y2),
            fill: colors[key],
            ref: createRef(),
          },
          month: x,
          [propName]: key,
          tooltip: `${key}: ${d3.format(",d")(month.data[propKey][key])}`,
        })
      })
    })
    return rects
  }
)
const stackPayerRects = stackRects(getPayerStack, "byPayer", "payer")
const stackCategoryRects = stackRects(
  getCategoryStack,
  "byCategory",
  "category"
)

const stackPropSumsBars = R.curry(
  (
    maxFn,
    rectsFn,
    keysFn,
    colorChooser,
    entries,
    innerWidth,
    innerHeight,
    colors
  ) => {
    const pickedColors = colorChooser(colors)
    const { chartData, xScale } = processDataAndXScale(entries, innerWidth)
    const yScale = getYScale(innerHeight, maxFn(chartData))
    const rects = rectsFn(
      keysFn(entries),
      chartData,
      xScale,
      yScale,
      pickedColors
    )
    return { chartData, xScale, yScale, rects }
  }
)
const stackPayerSumsBars = stackPropSumsBars(
  maxSumMonth,
  stackPayerRects,
  getPayers,
  choosePayerColors
)
const stackCategorySumsBars = stackPropSumsBars(
  maxSumMonth,
  stackCategoryRects,
  getCategories,
  chooseCategoryColors
)
const arrangeDataByPayerAndCategory = R.pipe(
  R.prop("byPayerAndCategory"),
  R.mapObjIndexed((val, key) => ({
    name: key,
    values: val,
  })),
  R.values
)
const stackByPayerAndCategory = R.curry((data, keys) => {
  return d3
    .stack()
    .keys(keys)
    .value((d, key) => d.values[key])
    .order(d3.stackOrderDescending)(arrangeDataByPayerAndCategory(data))
})

const seriesPayerStackCategoryRects = (
  chartData,
  xScale,
  yScale,
  stackKeys,
  colors
) => {
  const rects = []
  chartData.forEach(m => {
    const { month } = m
    const series = getSeriesPayersDescending(m)
    const subScale = getSubScale(series, xScale(month), xScale.bandwidth())
    const stacked = stackByPayerAndCategory(m, stackKeys)
    console.log(stacked)
    stacked.forEach(stack => {
      const category = stack.key
      stack.forEach(s => {
        const [y1, y2] = s
        if (isNaN(y1) || isNaN(y2)) return null
        const payer = s.data.name
        rects.push({
          props: {
            key: month + payer + category,
            x: subScale(payer),
            y: yScale(y2),
            width: subScale.bandwidth(),
            height: yScale(y1) - yScale(y2),
            fill: colors[category],
            ref: createRef(),
          },
          month,
          category,
          payer,
          tooltip: `${category}: ${d3.format(",d")(
            s.data.values[category]
          )} (${payer})`,
        })
      })
    })
  })
  return rects
}

const seriesPayerStackCategory = (
  entries,
  innerWidth,
  innerHeight,
  { categoryColors }
) => {
  const { chartData, xScale } = processDataAndXScale(entries, innerWidth)
  const yScale = getYScale(innerHeight, maxPayerSum(chartData))
  const rects = seriesPayerStackCategoryRects(
    chartData,
    xScale,
    yScale,
    getCategories(entries),
    categoryColors
  )
  return { chartData, xScale, yScale, rects }
}

const chartOptionsMap = new Map([
  ["000", singleMonthlySumsBars],
  ["001", seriesCategorySumsBars],
  ["100", seriesPayerSumsBars],
  ["011", stackCategorySumsBars],
  ["110", stackPayerSumsBars],
  ["111", seriesPayerStackCategory],
  ["101", null], // should always be stacked ^
  ["010", null], // nothing to stack
])

const getOptionsType = ({ withPayers, withStacks, withCategories }) => {
  const type = `${+withPayers}${+withStacks}${+withCategories}`
  if (type === "010") return "000"
  return type === "101" ? "111" : type
}

const getProcessFunction = options =>
  chartOptionsMap.get(getOptionsType(options))

const getEntries = (data, year) =>
  R.pipe(
    R.prop(year),
    R.prop("months"),
    R.values,
    R.map(R.pipe(R.prop("entries"), R.values)),
    R.flatten
  )(data)

export const BarChart = ({
  data,
  year,
  options: { withPayers, withCategories, withStacks },
  colors,
}) => {
  const [width, height] = [960, 500]
  const margin = { top: 40, right: 20, bottom: 40, left: 45 }
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const [rects, setRects] = useState([])

  useEffect(() => {
    const entries = getEntries(data, year)
    const options = { withPayers, withStacks, withCategories }
    const { chartData, xScale, yScale, rects } = getProcessFunction(options)(
      entries,
      innerWidth,
      innerHeight,
      colors
    )

    console.log(chartData, xScale.domain(), yScale.domain(), rects)
    setRects(rects)
  }, [data, year, withPayers, withStacks, withCategories, colors])

  return (
    <Chart
      width={width}
      height={height}
      marLeft={margin.left}
      marTop={margin.top}
    >
      {rects
        ? rects.map(rect => (
            <rect {...rect.props}>
              <title>{rect.tooltip}</title>
            </rect>
          ))
        : null}
    </Chart>
  )
}
