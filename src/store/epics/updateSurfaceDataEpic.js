import * as R from "ramda"
import { ofType } from "redux-observable"
import { of } from "rxjs"
import { map, switchMap } from "rxjs/operators"
import {
  initFilterables,
  updateFilterables,
  updateFilteredStack,
  updateSurfaceData,
} from "../slices/dataSlice"
import { getInitFilterables } from "../modules/getInitFilterables"
import { getUpdatedFilterables } from "./modules/getUpdatedFilterables"
import { getTopStackEntries } from "./modules/getUpdatedFilteredStack"

export const updateSurfaceDataEpic = (action$, state$) =>
  action$.pipe(
    ofType(updateFilteredStack.type),
    switchMap(({ payload }) =>
      of(
        updateSurfaceData(
          getTopStackEntries(payload) || state$.value.data.entries
        ),
        updateFilterables(
          getUpdatedFilterables(
            getInitFilterables(state$.value.data),
            payload
          )
        )
      )
    )
  )
