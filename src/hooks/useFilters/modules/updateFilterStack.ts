import { FilterStack, FilterField } from "../useFilters"

export function updateFilterStack(
  filterStack: FilterStack,
  key: FilterField,
  value: string,
) {
  let _filterStack = filterStack.filter(x => x[0] !== key) as FilterStack
  if (key === "year") {
    _filterStack = _filterStack.filter(x => x[0] !== "month")
  }
  if (value !== "") {
    _filterStack.push([key, value])
  }
  return _filterStack
}
