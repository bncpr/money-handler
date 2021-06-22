import * as R from "ramda"
import { useEffect, useState } from "react"
import { getColorsGenerator } from "../../utility/colors"

const assignColors = (array, colorsGen) =>
  R.zipObj(
    array,
    array.map(() => colorsGen.next().value),
  )

export const useColors = ({ payers, categories }) => {
  const [colors, setColors] = useState({})

  useEffect(() => {
    const colorsGenerator = getColorsGenerator()
    setColors({
      payerColors: assignColors(payers, colorsGenerator),
      categoryColors: assignColors(categories, colorsGenerator),
    })
  }, [payers, categories])

  const resetColors = () => {
    setColors({})
  }

  return { colors, resetColors }
}
