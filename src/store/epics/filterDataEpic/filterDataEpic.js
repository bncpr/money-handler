import { ofType } from "redux-observable"
import { map } from "rxjs/operators"
import {
  setFilter,
  updateFilteredStack,
} from "../../slices/dataSlice"
import { getUpdatedFilteredStack } from "../modules/getUpdatedFilteredStack"

export const filterDataEpic = (action$, state$) =>
  action$.pipe(
    ofType(setFilter.type),
    map(({ payload: { key, value } }) => {
      const { entries, filteredStack } = state$.value.data
      return updateFilteredStack(
        getUpdatedFilteredStack(key, value, entries, filteredStack)
      )
    })
  )
