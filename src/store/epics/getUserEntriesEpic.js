import { ofType } from "redux-observable"
import { concat, from, of, pipe, queueScheduler } from "rxjs"
import {
  catchError,
  last,
  map,
  mapTo,
  mergeMap,
  startWith,
  switchMap,
} from "rxjs/operators"

import { getUserEntries } from "../../firebase"

import { signIn } from "../slices/authenticationSlice"
import { getUserEntriesFulfilled, setFilter } from "../slices/dataSlice"

export const getUserEntriesEpic = action$ =>
  action$.pipe(
    ofType(signIn.type),
    switchMap(({ payload: { uid } }) =>
      from(getUserEntries(uid)).pipe(
        catchError(console.log),
        map(getUserEntriesFulfilled),
        startWith({ type: "getUserEntries/pending" })
      )
    )
  )
