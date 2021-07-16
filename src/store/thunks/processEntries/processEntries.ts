import { DataSliceState } from "../../../types/DataSliceState"
import { AppDispatch } from "../../store"
import { cacheEntries } from "../../slices/dataSlice"
import {
  getFields,
  getGroupedMonths,
  getGroupedTree,
} from "./modules/modules"
import { updateEntries } from "../../slices/groupedEntriesSlice/groupedEntriesSlice"

export function processEntries({ entries }: DataSliceState) {
  return (dispatch: AppDispatch) => {
    dispatch(cacheEntries({ entries }))
    dispatch({ type: "groupedEntries/processEntries" })
    const entriesArr = Object.values(entries)
    const groupedTree = getGroupedTree(entriesArr)
    const fields = getFields(groupedTree)
    const groupedMonths = getGroupedMonths(groupedTree.year)
    dispatch(
      updateEntries({
        entries: entriesArr,
        groupedTree,
        fields,
        groupedMonths,
      }),
    )
  }
}
