import { Entry } from "../../../types/Entry"
import { GroupedTree } from "../../../types/GroupedTree"
import { FilterStack, EntriesStack } from "../useFilters"

function getEntriesStackRec(
  entries: Entry[],
  filterStack: FilterStack,
  entriesStack: EntriesStack = [],
): EntriesStack {
  if (filterStack.length === 0) return entriesStack

  const [key, value] = filterStack[0]
  const _entries = entries.filter(entry => entry[key] === value)

  return getEntriesStackRec(
    _entries,
    filterStack.slice(1),
    entriesStack.concat({ key, value, entries: _entries }),
  )
}

export function getEntriesStack(tree: GroupedTree, filterStack: FilterStack) {
  if (filterStack.length === 0) return []

  const [key, value] = filterStack[0]
  
  if (key !== "month") {
    const entries = tree[key][value]
    if (entries)
      return getEntriesStackRec(entries, filterStack.slice(1), [
        { key, value, entries },
      ])
  }
  return []
}
