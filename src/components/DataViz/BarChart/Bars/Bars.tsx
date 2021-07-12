import { assoc, pipe } from "ramda"
import { Bar } from "./Bar/Bar"

export const Bars = ({
  rects,
  hovered,
  setHovered,
  isInitiallyFlat,
  y,
}: any) => {
  return rects.map((d: any) => (
    <Bar
      key={d.key}
      d={isInitiallyFlat ? pipe(assoc("height", 0), assoc("y", y))(d) : d}
      hovered={hovered}
      setHovered={setHovered}
    />
  ))
}
