import { useEffect, useState } from "react"
import { setSeriesRects } from "./setSeriesRects"
import { setSingleUnitRects } from "./setSingleUnitRects"

export const useRects = ({ unit, xScale, yScale, height, colors }) => {
  const [rects, setRects] = useState({})

  useEffect(() => {
    if (unit.series) {
      setSeriesRects(unit, xScale, yScale, height, colors, setRects)
    } else {
      setSingleUnitRects(unit, xScale, yScale, height, colors, setRects)
    }
  }, [unit, colors, height, xScale, yScale])

  return rects
}
