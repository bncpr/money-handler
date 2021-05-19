import { useEffect, useState } from "react"
import { shallowEqual, useSelector } from "react-redux"
import * as R from "ramda"

export const useEntries = () => {
  const entries = useSelector(state => state.data.entries, shallowEqual)
  const [entriesArr, setEntriesArr] = useState([])
  useEffect(() => {
    if (!R.isEmpty(entries) && R.isEmpty(entriesArr)) {
      setEntriesArr(R.values(entries))
    }
  }, [entries, entriesArr])
  return entriesArr
}
