import { useState, useEffect } from "react"

export const useFocus = () => {
  const [hoveredUnit, setHoveredUnit] = useState()
  const [focusedUnit, setFocusedUnit] = useState()

  useEffect(() => {
    const t = setTimeout(() => {
      if (hoveredUnit) {
        if (hoveredUnit !== focusedUnit) {
          setFocusedUnit(hoveredUnit)
          // console.log("SET_FOCUS", hoveredUnit)
        }
      } else {
        setFocusedUnit()
        // console.log("UNSET_FOCUS")
      }
    }, 0)
    return () => clearTimeout(t)
  }, [hoveredUnit, focusedUnit])

  const onMouseEnter = arg => () => setHoveredUnit(arg)
  const onMouseOut = () => () => setHoveredUnit()

  return { focusedUnit, onMouseEnter, onMouseOut }
}
