import { GroupedTree } from "../../../../types/GroupedTree";
import * as R from "remeda";

export function getGroupedMonths(obj: GroupedTree["year"] = {}) {
  return R.mapValues(obj, R.groupBy(R.prop("month")));
}
