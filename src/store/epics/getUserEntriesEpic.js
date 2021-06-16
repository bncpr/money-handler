import { ifElse, isEmpty } from "ramda"
import { ofType } from "redux-observable"
import { from, of } from "rxjs"
import { catchError, map, startWith, switchMap } from "rxjs/operators"
import { getUserEntries } from "../../firebase"
import { signIn } from "../slices/authenticationSlice"
import {
  getUserEntriesNoEntries
} from "../slices/dataSlice"
import { showError } from "../slices/errorSlice"
import { updateEntries } from "../slices/groupedEntriesSlice/groupedEntriesSlice"

export const getUserEntriesEpic = action$ =>
  action$.pipe(
    ofType(signIn.type),
    switchMap(({ payload: { uid } }) =>
      from(getUserEntries(uid)).pipe(
        map(data =>
          ifElse(isEmpty, getUserEntriesNoEntries, updateEntries)(data),
        ),
        catchError(error => of(showError(error))),
        startWith({ type: "data/getUserEntries/pending" }),
      ),
    ),
  )
