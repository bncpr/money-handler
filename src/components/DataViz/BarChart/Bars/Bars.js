import { assoc } from "ramda"
import { pipe } from "rxjs"
import { Bar } from "./Bar/Bar"

export const Bars = ({ rects, hovered, setHovered, isInitiallyFlat, y }) => {
  return rects.map(d => (
    <Bar
      key={d.key}
      d={isInitiallyFlat ? pipe(assoc("height", 0), assoc("y", y))(d) : d}
      hovered={hovered}
      setHovered={setHovered}
    />
  ))
}
