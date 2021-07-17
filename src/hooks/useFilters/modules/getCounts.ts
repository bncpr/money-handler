import * as R from "remeda"
import { GroupedTree } from "../../../types/GroupedTree"
import { Counts, EntriesStack, FiltersType } from "../useFilters"
import { countBy } from "../../../utility/functions/countBy"

export function getCounts(
  tree: GroupedTree,
  entriesStack: EntriesStack,
  filters: FiltersType,
) {
  const counts = R.mapValues(tree, dict =>
    R.mapValues(dict, arr => arr.length),
  ) as Counts

  const runOn = R.zip(
    entriesStack.map(R.prop("entries")),
    entriesStack.map(R.prop("key")).slice(1),
  )

  runOn.forEach(([prevEntries, key]) => {
    counts[key] = countBy(prevEntries, key)
  })

  const filtered = entriesStack.map(R.prop("key"))
  const entries = R.last(entriesStack)?.entries || []
  const rest = (Object.keys(filters) as (keyof FiltersType)[]).filter(
    x => !filtered.includes(x),
  )
  rest.forEach(key => {
    counts[key] = countBy(entries, key)
  })

  return counts
}
