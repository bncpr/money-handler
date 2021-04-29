import * as R from "ramda"



export const didFetchYear = R.curry(
  (data, year) => data && year && data[year] instanceof Object
)

