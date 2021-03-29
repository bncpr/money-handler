import { updateObj } from '../../utility/utility'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
  entries: [],
  subs: [],
  categories: [],
  didReqEntries: false,
  didReqEntryFormData: false
}

//TODO: errors

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ENTRIES_INIT:
      return updateObj(state, { didReqEntries: true })
    case actionTypes.GET_ENTRIES_SUCCESS:
      return updateObj(state, { entries: action.payload.entries })
    case actionTypes.GET_ENTRIES_FAIL:
      return updateObj(state)
    case actionTypes.SUBMIT_ENTRY_SUCCESS:
      return updateObj(state, { entries: state.entries.concat(action.payload.entry) })
    case actionTypes.GET_ENTRY_FORM_DATA_INIT:
      return updateObj(state, { didReqEntryFormData: true })
    case actionTypes.GET_SUBCATEGORIES_SUCCESS:
      return updateObj(state, { subs: state.subs.concat(action.payload.subcategories) })
    case actionTypes.GET_SUBCATEGORIES_FAIL:
      return state
    case actionTypes.GET_CATEGORIES_SUCCESS:
      return updateObj(state, { categories: state.categories.concat(action.payload.categories) })
    case actionTypes.GET_CATEGORIES_FAIL:
      return state
    case actionTypes.ADD_TAG:
      const name = action.payload.name;
      const value = action.payload.value;
      return updateObj(state, { [name]: state[name].concat(value) })
    default: return state
  }
}