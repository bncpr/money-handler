import { shallowEqual, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { colorsGenerator } from "../../utility/colors"
import * as R from "ramda"

export function selectColorsSet(series, showBy, colors) {
  if (showBy === "payer") return colors.payerColors
  if (showBy === "category") return colors.categoryColors
  // Give precedence to showBy because it comes on top of series
  if (series === "payer") return colors.payerColors
  if (series === "category") return colors.categoryColors
  return {}
}

const assignColors = (array, colorsGen) =>
  R.zipObj(
    array,
    array.map(() => colorsGen.next().value),
  )

export const useColors = ({ payers, categories }) => {
  const [colors, setColors] = useState({})

  useEffect(() => {
    if (R.isEmpty(colors) && (!R.isEmpty(payers) || !R.isEmpty(categories))) {

      setColors({
        payerColors: assignColors(payers, colorsGenerator),
        categoryColors: assignColors(categories, colorsGenerator),
      })
    }
  }, [payers, categories])

  return colors
}
