import { format } from "d3-format"
import * as d3 from "d3-shape"
import { capitalizeFirstChar } from "../../../utility/utility"
import { ChartBox } from "../ChartBox/ChartBox"

export const PieChart = ({
  data,
  width,
  height,
  margin,
  colors,
  hovered,
  ...rest
}: any) => {
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
