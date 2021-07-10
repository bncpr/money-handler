import * as R from "ramda"

export const capitalizeFirstChar = (s: string) =>
  s ? `${s.charAt(0).toUpperCase()}${s.slice(1)}` : ""

export const sortDescendList = R.sort(R.descend(R.identity))
export const sortAscendList = R.sort(R.ascend(R.identity))
