import { shallowEqual, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import * as R from "ramda"

export const useYears = (withInitYear = true) => {
  const { years } = useSelector(state => state.data, shallowEqual)
  const [year, setYear] = useState("")

  useEffect(() => {
    if (R.isEmpty(year) && !R.isEmpty(years) && withInitYear) {
      setYear(years.reduce(R.max, ""))
    }
  }, [year, years])
  return { years, year, setYear }
}
