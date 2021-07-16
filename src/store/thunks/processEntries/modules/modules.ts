import * as R from "remeda"
import { Entry } from "../../../../types/Entry"
import { GroupedTree } from "../../../../types/GroupedTree"
import { sortCompMap } from "../../../../utility/sorting/sortCompMap"

export function getGroupedMonths(obj: GroupedTree["year"] = {}) {
  return R.mapValues(obj, R.groupBy(R.prop("month")))
}

export function getGroupedTree(x: Entry[]) {
  return {
    year: R.groupBy(x, R.prop("year")),
    payer: R.groupBy(x, R.prop("payer")),
    category: R.groupBy(x, R.prop("category")),
  }
}

export function getFields(x: GroupedTree) {
  return R.mapValues(x, value =>
    Object.keys(value).sort(sortCompMap.ascend.string),
  )
}
