import { format } from "d3-format"
import * as d3 from "d3-shape"
import * as R from "ramda"
import { capitalizeFirstChar } from "../../../utility/utility"
import { ChartBox } from "../ChartBox/ChartBox"

export const PieChart = ({
  data,
  width,
  height,
  margin,
  colors,
  setHovered,
  hovered,
  ...rest
}) => {
  const r = Math.min(width, height) / 2 - margin
  const pie = d3.pie().value(R.prop(1))(data)
  const arc = d3.arc()
  const arcLabel = d3
    .arc()
    .innerRadius(r * 0.7)
    .outerRadius(r * 0.7)
  const sum = R.sum(R.map(R.prop(1), data))

  return (
    <ChartBox
      width={width}
      height={height}
      ml={width / 2}
      mt={height / 2}
      {...rest}
    >
      {pie.map(d => (
        <path
          key={d.data[0]}
          value={"" + d.value}
          d={arc.innerRadius(0).outerRadius(r)(d)}
          stroke={hovered === d.data[0] ? "black" : ""}
          strokeWidth={hovered === d.data[0] ? "1px" : "0.5px"}
          fill={colors[d.data[0]]}
          name={d.data[0]}
          // onMouseEnter={e => setHovered(e.target.getAttribute("name"))}
          // onMouseOut={() => setHovered("")}
        >
          <title>{`${capitalizeFirstChar(d.data[0])}: ${format(",")(
            d.value,
          )}`}</title>
        </path>
      ))}
      {pie.map(d => {
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
