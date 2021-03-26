import { updateObj } from '../../utility/utility'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
  entries: [],
  subs: [],
  gotEntries: false,
  gotSubcategories: false
}

//TODO: error

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ENTRIES_SUCCESS:
      return updateObj(state, { entries: action.payload.entries, gotEntries: true })
    case actionTypes.GET_ENTRIES_FAIL:
      return updateObj(state, { gotEntries: true })
    case actionTypes.SUBMIT_ENTRY_SUCCESS:
      return updateObj(state, { entries: state.entries.concat(action.payload.entry) })
    case actionTypes.GET_SUBCATEGORIES_SUCCESS:
      return updateObj(state, { subs: state.subs.concat(action.payload.subcategories), gotSubcategories: true })
    case actionTypes.GET_SUBCATEGORIES_FAIL:
      return updateObj(state, { gotSubcategories: true })
    default: return state
  }
}