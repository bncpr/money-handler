import { BarLabel } from "./BarLabel/BarLabel"

export const BarsLabels = ({ rects, hovered, setHovered, fontSize }: any) => {
  return rects.map(
    (d: any) =>
      hovered === d.name &&
      d.value && <BarLabel key={d.key} d={d} fontSize={fontSize} />,
  )
}
