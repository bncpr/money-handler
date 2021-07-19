import * as R from "ramda"
import { useCallback, useEffect, useState } from "react"
import { getColorsGenerator } from "../../utility/colors"

function assignColors(
  array: string[],
  colorsGen: Generator,
): { [x: string]: string } {
  return R.zipObj(
    array,
    array.map(() => colorsGen.next().value),
  )
}

export type ColorsState = {
  payerColors: { [x: string]: string }
  categoryColors: { [x: string]: string }
}

const initialState: ColorsState = {
  payerColors: {},
  categoryColors: {},
}

export function useColors({ payers, categories }: { [x: string]: string[] }) {
  const [colors, setColors] = useState(initialState)

  useEffect(() => {
    const colorsGenerator = getColorsGenerator()
    setColors({
      payerColors: assignColors(payers, colorsGenerator),
      categoryColors: assignColors(categories, colorsGenerator),
    })
  }, [payers, categories])

  // useCallback for useEffect dependency
  const resetColors = useCallback(() => setColors(initialState), [setColors])

  return { colors, resetColors }
}
