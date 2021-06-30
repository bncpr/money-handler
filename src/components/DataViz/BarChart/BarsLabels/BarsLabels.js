import { BarLabel } from "./BarLabel/BarLabel"

export const BarsLabels = ({ rects, hovered, fontSize }) => {
  return rects.map(
    d =>
      hovered === d.name &&
      d.value && <BarLabel key={d.key} d={d} fontSize={fontSize} />,
  )
}
