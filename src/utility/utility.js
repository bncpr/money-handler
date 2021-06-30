import * as R from "ramda"

export const capitalizeFirstChar = string =>
  string ? `${string.charAt(0).toUpperCase()}${string.slice(1)}` : ""







export const sortDescendList = R.sort(R.descend(R.identity))
export const sortAscendList = R.sort(R.ascend(R.identity))
