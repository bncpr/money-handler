import { updateObj } from '../../utility/utility'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
  data: [],
  subs: [],
  isLoaded: false
}

//TODO: error

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ENTRIES_SUCCESS:
      return updateObj(state, { data: action.payload.entries, isLoaded: true })
    case actionTypes.GET_ENTRIES_FAIL:
      return updateObj(state, { isLoaded: true })
    case actionTypes.SUBMIT_ENTRY_SUCCESS:
      return updateObj(state, { data: state.data.concat(action.payload.entry) })
    case actionTypes.GET_SUBCATEGORIES_SUCCESS:
      return updateObj(state, { subs: state.subs.concat(action.payload.subcategories) })
    default: return state
  }
}