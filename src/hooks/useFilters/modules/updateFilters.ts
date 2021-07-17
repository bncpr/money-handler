import * as R from "remeda"
import { FiltersType } from "../useFilters"

export function updateFilters(
  filters: FiltersType,
  key: keyof FiltersType,
  value: string,
) {
  const _filters = R.addProp(filters, key, value)
  if (key === "year") {
    _filters.month = ""
  }
  return _filters
}
