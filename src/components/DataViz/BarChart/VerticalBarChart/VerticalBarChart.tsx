import { easeCubicOut, select } from "d3"
import { scaleBand, scaleLinear } from "d3-scale"
import * as R from "ramda"
import { createRef, useEffect } from "react"
import { ChartBox } from "../../ChartBox/ChartBox"
import { Bars } from "../Bars/Bars"
import { BarsLabels } from "../BarsLabels/BarsLabels"
import { BottomAxis } from "../BottomAxis"
import { LeftAxis } from "../LeftAxis"
import { AverageStroke } from "../Stroke/AverageStroke/AverageStroke"
import {
  getDomainXAlphanumerical,
  getDomainXDescendingValue,
} from "../_modules/getDomainX"

export const VerticalBarChart = ({
  fields,
  height,
  width,
  fieldName,
  colors,
  margin,
  sortByValue,
  fontSize,
  subField,
  setHovered,
  hovered,
  average,
  ...rest
}: any) => {
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const domainX = sortByValue
    ? getDomainXDescendingValue(fields)
    : getDomainXAlphanumerical(fields)

  const domainY = [0, fields.map((el: any[]) => el[1]).reduce(R.max, 0) || 1000]

  const xScale = scaleBand().domain(domainX).range([0, innerWidth]).padding(0.1)

  const yScale = scaleLinear().domain(domainY).range([innerHeight, 0])

  const rects = fields.map(([key, value]: [string, number]) => ({
    key,
    x: xScale(key),
    y: yScale(value),
    width: xScale.bandwidth(),
    height: innerHeight - yScale(value),
    fill: colors[key],
    name: key,
    value: value,
    ref: createRef(),
  }))

  useEffect(() => {
    rects.forEach((rect: any) => {
      select(rect.ref.current)
        .transition()
        .ease(easeCubicOut)
        .duration(400)
        .attr("y", rect.y)
        .attr("height", rect.height)
    })
  }, [rects])

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
      {average && (
        <AverageStroke
          y={yScale(average)}
          width={innerWidth}
          stroke={colors[hovered]}
        />
      )}
      <Bars
        rects={rects}
        hovered={hovered}
        setHovered={setHovered}
        isInitiallyFlat
        y={yScale(0)}
      />
      <BarsLabels rects={rects} hovered={hovered} fontSize={16} />
    </ChartBox>
  )
}
