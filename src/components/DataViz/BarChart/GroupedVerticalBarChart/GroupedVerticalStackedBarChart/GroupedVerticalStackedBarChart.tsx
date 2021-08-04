import { nanoid } from "@reduxjs/toolkit"
import { stack, stackOrderDescending } from "d3"
import { scaleBand, scaleLinear } from "d3-scale"
import { createRef, useMemo } from "react"
import { flatten, map, pipe } from "remeda"
import { sortCompMap } from "../../../../../utility/sorting/sortCompMap"
import { ChartBox } from "../../../ChartBox/ChartBox"
import { Bars } from "../../Bars/Bars"
import { BarsLabels } from "../../BarsLabels/BarsLabels"
import { BottomAxis } from "../../BottomAxis"
import { LeftAxis } from "../../LeftAxis"
import { getDomainXAlphanumerical } from "../../_modules/getDomainX"

export const GroupedVerticalStackedBarChart = ({
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
  setMonth,
  ...rest
}: any) => {
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const data: Record<string, number>[] = useMemo(
    () =>
      [...fields]
        .sort(([a], [b]) => sortCompMap.ascend.string(a, b))
        .map(([key, obj]) => ({ ...obj, month: key })),
    [fields],
  )

  const domainX = getDomainXAlphanumerical(fields)
  const domainY = [
    0,
    fields
      .map(([_, obj]: [string, Record<string, number>]) =>
        Object.values(obj).reduce((a, b) => a + b),
      )
      .reduce((acc: number, x: number) => (acc < x ? x : acc), 0) || 100,
  ]

  const stackedData = useMemo(
    () => stack().keys(subField).order(stackOrderDescending)(data),
    [data, subField],
  )

  const xScale = scaleBand().domain(domainX).range([0, innerWidth]).padding(0.1)

  const yScale = scaleLinear().domain(domainY).range([innerHeight, 0])

  const rects = useMemo(
    () =>
      pipe(
        stackedData,
        map(layer => {
          const key = layer.key
          return layer.map((xy, i) => ({
            key: nanoid(5),
            x: xScale(domainX[i]),
            y: yScale(xy[1]),
            width: xScale.bandwidth(),
            height: yScale(xy[0]) - yScale(xy[1]),
            fill: colors[key],
            name: key,
            value: xy.data[key],
            ref: createRef(),
          }))
        }),
        flatten,
      ),
    [stackedData, yScale, xScale, colors, domainX],
  )

  // useEffect(() => {
  //   _rects.forEach(rect => {
  //     select(rect.ref.current)
  //       .transition()
  //       .ease(easeCubicOut)
  //       .duration(400)
  //       .attr("y", rect.y)
  //       .attr("height", rect.height)
  //   })
  //   console.log(_rects)
  // }, [_rects])

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
      <Bars
        rects={rects}
        hovered={hovered}
        setHovered={setHovered}
        isInitiallyFlat={false}
        y={yScale(0)}
      />
      <BarsLabels rects={rects} hovered={hovered} fontSize={14} />
    </ChartBox>
  )
}
