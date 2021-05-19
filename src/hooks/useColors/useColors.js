import { shallowEqual, useSelector } from "react-redux"
import { useEffect, useState } from "react"

function selectColorsSet(series, showBy, colors) {
  if (showBy === "payer") return colors.payerColors
  if (showBy === "category") return colors.categoryColors
  // Give precedence to showBy because it comes on top of series
  if (series === "payer") return colors.payerColors
  if (series === "category") return colors.categoryColors
  return {}
}

export const useColors = (series, showBy) => {
  const colors = useSelector(state => state.dashboard.colors, shallowEqual)
  const [colorSet, setColorSet] = useState({})

  useEffect(() => {
    setColorSet(selectColorsSet(series, showBy, colors))
  }, [series, showBy, colors])

  return colorSet
}
