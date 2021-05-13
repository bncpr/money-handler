import { ofType } from "redux-observable";
import { getUserEntriesFulfilled, setFilter } from "../slices/dataSlice";
import { map } from "rxjs/operators";
import { max, reduce } from "ramda";

export const setInitialFiltersEpic = action$ => action$.pipe(
  ofType(getUserEntriesFulfilled.type),
  map(action => setFilter({
    key: "year",
    value: reduce(max, "", action.payload.years || []),
  })
  )
);
