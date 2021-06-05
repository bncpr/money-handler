import * as R from "ramda"
import { useEffect, useState } from "react"

export const useInitialPick = (
  field,
  set,
  pickFn = R.reduce(R.max, ""),
  limit = 1,
) => {
  const [lim, setLimit] = useState(limit)
  useEffect(() => {
    if (!R.isEmpty(field) && lim) {
      set(pickFn(field))
      setLimit(lim - 1)
    }
  }, [field, lim])
}
