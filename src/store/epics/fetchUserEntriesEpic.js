import { get, ref } from "@firebase/database"
import { ofType } from "redux-observable"
import { catchError, map, switchMap } from "rxjs/operators"
import { db } from "../../firebase"
import { signIn } from "../slices/authenticationSlice"
import { from } from "rxjs"

export const fetchUserEntriesEpic = action$ =>
  action$.pipe(
    ofType(signIn.type),
    switchMap(action =>
      from(
        get(ref(db, `users/${action.payload.uid}`)).then(snapshot =>
          snapshot.val()
        )
      )
    ),
    map(payload => ({
      type: "gotIt",
      payload,
    })),
    catchError(error => {
      console.log(error)
    })
  )
