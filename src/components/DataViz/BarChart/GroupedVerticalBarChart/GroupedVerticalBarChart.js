import { scaleBand, scaleLinear } from "d3-scale"
import * as R from "ramda"
import { ChartBox } from "../../ChartBox/ChartBox"
import { BottomAxis } from "../BottomAxis"
import { LeftAxis } from "../LeftAxis"
import {
  getDomainXAlphanumerical,
  getDomainXDescendingValue,
} from "../_modules/getDomainX"
import { getDescendingKeys } from "../_modules/getDescendingKeys"

const getMaxOfSubFields = R.pipe(
  R.map(R.prop(1)),
  R.chain(R.values),
  R.reduce(R.max, 0),
)
export const groupByProp = prop => R.groupBy(R.prop(prop))
const getSums = R.map(R.pipe(R.map(R.prop("value")), R.sum))

export const GroupedVerticalBarChart = ({
  entries,
  height,
  width,
  fieldName,
  subFieldName,
  subField,
  colors,
  margin,
  sortByValue,
  fontSize,
  ...rest
}) => {
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const initSubField = R.zipObj(subField, subField.map(R.always(0)))
  const fields = R.pipe(
    groupByProp(fieldName),
    R.map(groupByProp(subFieldName)),
    R.map(getSums),
    R.map(R.mergeRight(initSubField)),
    R.toPairs,
  )(entries)

  const domainX = getDomainXAlphanumerical(fields)
  const domainY = [0, getMaxOfSubFields(fields)]

  const xScale = scaleBand().domain(domainX).range([0, innerWidth]).padding(0.1)

  const yScale = scaleLinear().domain(domainY).range([innerHeight, 0])
  console.log(colors)

  const rects = R.unnest(
    fields.map(([key, series]) => {
      const subScale = scaleBand()
        .domain(getDescendingKeys(series))
        .range([xScale(key), xScale(key) + xScale.bandwidth()])
      return subScale.domain().map(d => ({
        key: key + d,
        x: subScale(d),
        y: yScale(series[d]),
        width: subScale.bandwidth(),
        height: innerHeight - yScale(series[d]),
        fill: colors[d],
      }))
    }),
  )

  return (
    <ChartBox h={height} w={width} ml={margin.left} mt={margin.top} {...rest}>
      <LeftAxis yScale={yScale} width={innerWidth} />
      <BottomAxis
        xScale={xScale}
        height={innerHeight}
        yOffset={margin.bottom / 2}
        showBy={fieldName}
        fontSize
      />
      {rects.map(d => (
        <rect {...d} />
      ))}
    </ChartBox>
  )
}
