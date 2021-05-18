import { ofType } from "redux-observable"
import {
  getUserEntriesFulfilled,
  setFilter,
  initFilterables,
} from "../slices/dataSlice"
import { map, switchMap } from "rxjs/operators"
import { max, reduce } from "ramda"
import { of } from "rxjs"

export const setInitialFiltersEpic = (action$, state$) =>
  action$.pipe(
    ofType(getUserEntriesFulfilled.type),
    switchMap(() => {
      const { years } = state$.value.data
      const initFilter = reduce(max, "", years)
      return of(
        setFilter({ key: "year", value: initFilter }),
        initFilterables()
      )
    })
  )
