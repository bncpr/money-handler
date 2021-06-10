import { Text } from "@chakra-ui/layout"
import { scaleBand, scaleLinear } from "d3-scale"
import * as R from "ramda"
import { ChartBox } from "../../ChartBox/ChartBox"
import { BottomAxis } from "../BottomAxis"
import { LeftAxis } from "../LeftAxis"
import {
  getDomainXAlphanumerical,
  getDomainXDescendingValue,
} from "../_modules/getDomainX"
import { Bar } from "../Bar/Bar"
import { capitalizeFirstChar } from "../../../../utility/utility"
import { format } from "d3-format"

export const VerticalBarChart = ({
  fields,
  height,
  width,
  fieldName,
  colors,
  margin,
  sortByValue,
  fontSize,
  label,
  subField,
  setHovered,
  hovered,
  ...rest
}) => {
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const domainX = sortByValue
    ? getDomainXDescendingValue(fields)
    : getDomainXAlphanumerical(fields)

  const domainY = [0, fields.map(R.prop(1)).reduce(R.max, 0) || 1000]

  const xScale = scaleBand().domain(domainX).range([0, innerWidth]).padding(0.1)

  const yScale = scaleLinear().domain(domainY).range([innerHeight, 0])

  const rects = fields.map(([key, value]) => ({
    key,
    x: xScale(key),
    y: yScale(value),
    width: xScale.bandwidth(),
    height: innerHeight - yScale(value),
    fill: colors[key],
    name: key,
    value: value,
  }))

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
