import { ofType } from "redux-observable"
import { concat, from, of, queueScheduler } from "rxjs"
import {
  catchError,
  last,
  map,
  mapTo,
  mergeMap,
  switchMap,
} from "rxjs/operators"

import { fetchUserEntries } from "../../firebase"

import { signIn } from "../slices/authenticationSlice"
import { getUserEntriesFulfilled, setFilter } from "../slices/dataSlice"

export const fetchUserEntriesEpic = action$ =>
  action$.pipe(
    ofType(signIn.type),
    switchMap(({ payload: { uid } }) => from(fetchUserEntries(uid))),
    catchError(error => {
      console.log(error)
    }),
    map(getUserEntriesFulfilled)
  )
