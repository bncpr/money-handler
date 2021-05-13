import { combineEpics, ofType } from "redux-observable"
import { map, withLatestFrom } from "rxjs/operators"
import { setFilter } from "../slices/dataSlice"
import { fetchUserEntriesEpic } from "./fetchUserEntriesEpic"
import { setInitialFiltersEpic } from "./setInitialFiltersEpic"

export const rootEpic = combineEpics(
  fetchUserEntriesEpic,
  setInitialFiltersEpic
)

const filterDataEpic = (action$, state$) =>
  action$.pipe(
    ofType(setFilter.type),
    withLatestFrom(state$),
    map(([action, state]) => null)
  )