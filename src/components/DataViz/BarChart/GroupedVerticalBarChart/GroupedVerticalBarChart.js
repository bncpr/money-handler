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
import { getDescendingKeys } from "../_modules/getDescendingKeys"
import { getDomainXAlphanumerical } from "../_modules/getDomainX"

const getMaxOfSubFields = R.pipe(
  R.map(R.prop(1)),
  R.chain(R.values),
  R.reduce(R.max, 0),
)

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
  setHovered,
  hovered,
  average,
  month,
  ...rest
}) => {
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const domainX = getDomainXAlphanumerical(fields)
  const domainY = [0, getMaxOfSubFields(fields) || 100]

  const xScale = scaleBand().domain(domainX).range([0, innerWidth]).padding(0.1)

  const yScale = scaleLinear().domain(domainY).range([innerHeight, 0])

  const rects = R.unnest(
    fields.map(([key, series]) => {
      const subScale = scaleBand()
        .domain(getDescendingKeys(series))
        .range([xScale(key), xScale(key) + xScale.bandwidth()])
      return subScale.domain().map((d, i) => ({
        key: key + d + i,
        x: subScale(d),
        y: yScale(series[d]),
        width: subScale.bandwidth(),
        height: innerHeight - yScale(series[d]),
        fill: colors[d],
        name: d,
        value: series[d],
        ref: createRef(),
      }))
    }),
  )

  useEffect(() => {
    rects.forEach(rect => {
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
        selected={month}
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
      <BarsLabels rects={rects} hovered={hovered} fontSize={12} />
    </ChartBox>
  )
}
