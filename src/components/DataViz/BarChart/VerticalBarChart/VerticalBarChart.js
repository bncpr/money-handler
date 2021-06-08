import { Box } from "@chakra-ui/layout"
import { scaleBand, scaleLinear } from "d3-scale"
import * as R from "ramda"
import { ChartBox } from "../../ChartBox/ChartBox"
import { BottomAxis } from "../BottomAxis"
import { LeftAxis } from "../LeftAxis"
import {
  getDomainXAlphanumerical,
  getDomainXDescendingValue,
} from "../_modules/getDomainX"

export const VerticalBarChart = ({
  entries,
  height,
  width,
  fieldName,
  colors,
  margin,
  sortByValue,
  fontSize,
  ...rest
}) => {
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const fields = R.pipe(
    R.groupBy(R.prop(fieldName)),
    R.map(R.pipe(R.map(R.prop("value")), R.sum)),
    R.toPairs,
  )(entries)

  const domainX = sortByValue
    ? getDomainXDescendingValue(fields)
    : getDomainXAlphanumerical(fields)

  const domainY = [0, fields.map(R.prop(1)).reduce(R.max, 0)]

  const xScale = scaleBand().domain(domainX).range([0, innerWidth]).padding(0.1)

  const yScale = scaleLinear().domain(domainY).range([innerHeight, 0])

  const rects = fields.map(([key, value]) => ({
    key: key,
    x: xScale(key),
    y: yScale(value),
    width: xScale.bandwidth(),
    height: innerHeight - yScale(value),
    fill: colors[key],
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
        <Box as='rect' {...d} />
      ))}
    </ChartBox>
  )
}
