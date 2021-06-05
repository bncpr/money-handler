import { useState } from "react"
import { shallowEqual, useSelector } from "react-redux"

export const useYears = () => {
  const { year: years } = useSelector(
    state => state.groupedEntries.fields,
    shallowEqual,
  )
  const [year, setYear] = useState("")

  return { years, year, setYear }
}
