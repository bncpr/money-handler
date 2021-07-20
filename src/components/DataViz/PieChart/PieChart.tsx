import { format } from "d3-format"
import * as d3 from "d3-shape"
import { FunctionComponent } from "react"
import { ColorsState } from "../../../hooks/useColors/useColors"
import { capitalizeFirstChar } from "../../../utility/utility"
import { ChartBox } from "../ChartBox/ChartBox"

type PieChartProps = {
  data: any
  width: number
  height: number
  margin: number
  colors: ColorsState["categoryColors"]
  hovered: string
  setHovered: (val: string) => void
} & Record<string, any>

export const PieChart: FunctionComponent<PieChartProps> = ({
  data,
  width,
  height,
  margin,
  colors,
  hovered,
  setHovered,
  ...rest
}) => {
  const r = Math.min(width, height) / 2 - margin
  const pie = d3.pie().value((pair: any) => pair[1])(data)
  const arc = d3.arc()
  const arcLabel = d3
    .arc()
    .innerRadius(r * 0.7)
    .outerRadius(r * 0.7)
  const sum = (data as [string, number][])
    .map(pair => pair[1])
    .reduce((a, b) => a + b, 0)

  return (
    <ChartBox
      width={width}
      height={height}
      ml={width / 2}
      mt={height / 2}
      {...rest}
    >
      {pie.map((d: any) => (
        <path
          key={d.data[0]}
          d={arc.innerRadius(0).outerRadius(r)(d) || undefined}
          stroke={hovered === d.data[0] ? "black" : ""}
          strokeWidth={hovered === d.data[0] ? "1px" : "0.5px"}
          fill={colors[d.data[0]]}
          name={d.data[0]}
          onMouseEnter={() => setHovered(d.data[0])}
          onMouseOut={() => setHovered("")}
        >
          <title>{`${capitalizeFirstChar(d.data[0])}: ${format(",")(
            d.value,
          )}`}</title>
        </path>
      ))}
      {pie.map((d: any) => {
        const percent = Math.floor((d.value / sum) * 100)
        return (
          percent >= 5 && (
            <text
              key={d.data[0]}
              transform={`translate(${arcLabel.centroid(d)})`}
              textAnchor='middle'
              fontSize='12'
              onMouseOver={() => setHovered(d.data[0])}
              onMouseOut={() => setHovered("")}
            >
              <tspan fontWeight='bold' y='-0.3em'>
                {d.data[0]}
              </tspan>
              <tspan x='0' y='0.7em'>
                {`${format(",")(d.value)} (${percent})%`}
              </tspan>
            </text>
          )
        )
      })}
    </ChartBox>
  )
}
