import { ifElse, isEmpty } from "ramda"
import { ofType } from "redux-observable"
import { from, of } from "rxjs"
import { catchError, map, startWith, switchMap } from "rxjs/operators"
import { getUserEntries } from "../../firebase"
import { signIn } from "../slices/authenticationSlice"
import {
  getUserEntriesFulfilled,
  getUserEntriesNoEntries
} from "../slices/dataSlice"
import { showError } from "../slices/errorSlice"



export const getUserEntriesEpic = action$ =>
  action$.pipe(
    ofType(signIn.type),
    switchMap(({ payload: { uid } }) =>
      from(getUserEntries(uid)).pipe(
        map(data =>
          ifElse(
            isEmpty,
            getUserEntriesNoEntries,
            getUserEntriesFulfilled
          )(data)
        ),
        catchError(error => of(showError(error))),
        startWith({ type: "data/getUserEntries/pending" })
      )
    )
  )
