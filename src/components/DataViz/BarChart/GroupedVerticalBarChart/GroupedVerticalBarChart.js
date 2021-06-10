import { Box, Text } from "@chakra-ui/layout"
import { format } from "d3-format"
import { scaleBand, scaleLinear } from "d3-scale"
import * as R from "ramda"
import { capitalizeFirstChar } from "../../../../utility/utility"
import { ChartBox } from "../../ChartBox/ChartBox"
import { Bar } from "../Bar/Bar"
import { BottomAxis } from "../BottomAxis"
import { LeftAxis } from "../LeftAxis"
import { getDescendingKeys } from "../_modules/getDescendingKeys"
import { getDomainXAlphanumerical } from "../_modules/getDomainX"

const getMaxOfSubFields = R.pipe(
  R.map(R.prop(1)),
  R.chain(R.values),
  R.reduce(R.max, 0),
)
export const groupByProp = prop => R.groupBy(R.prop(prop))
const getSums = R.map(R.pipe(R.map(R.prop("value")), R.sum))

export const GroupedVerticalBarChart = ({
  fields,
  height,
  width,
  fieldName,
  subFieldName,
  subField,
  colors,
  margin,
  sortByValue,
  fontSize,
  label,
  setHovered,
  hovered,
  ...rest
}) => {
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const domainX = getDomainXAlphanumerical(fields)
  const domainY = [0, getMaxOfSubFields(fields) || 100]

  const xScale = scaleBand().domain(domainX).range([0, innerWidth]).padding(0.2)

  const yScale = scaleLinear().domain(domainY).range([innerHeight, 0])

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
        name: d,
        value: series[d],
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
        fontSize={fontSize}
      />
      {rects.map(d => (
        <Bar d={d} hovered={hovered} setHovered={setHovered} />
      ))}
      {rects.map(
        d =>
          hovered === d.name &&
          d.value && (
            <text
              transform={`translate(${d.x + d.width},${d.y})`}
              fontSize='16'
              dy='0.5em'
              dx='0.2em'
            >
              <tspan fontWeight='bold' y='-0.5em'>
                {capitalizeFirstChar(d.name)}
              </tspan>
              <tspan x='0.2em' y='1.1em'>
                {format(",")(d.value)}
              </tspan>
            </text>
          ),
      )}
      <Text as='text' x={innerWidth - 20} textAnchor='end' fontSize='1.3em'>
        {label}
      </Text>
    </ChartBox>
  )
}
