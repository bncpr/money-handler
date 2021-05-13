import { combineEpics, ofType } from "redux-observable"
import { map, withLatestFrom } from "rxjs/operators"
import { setFilter } from "../slices/dataSlice"
import { getUserEntriesEpic } from "./getUserEntriesEpic"
import { setInitialFiltersEpic } from "./setInitialFiltersEpic"

export const rootEpic = combineEpics(
  getUserEntriesEpic,
  setInitialFiltersEpic
)

const filterDataEpic = (action$, state$) =>
  action$.pipe(
    ofType(setFilter.type),
    withLatestFrom(state$),
    map(([action, state]) => null)
  )