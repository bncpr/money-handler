import { updateObj } from '../../utility/utility'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
  entries: [],
  subs: [],
  categories: []
}

//TODO: errors

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ENTRIES_SUCCESS:
      return updateObj(state, { entries: action.payload.entries })
    case actionTypes.GET_ENTRIES_FAIL:
      throw new Error
    case actionTypes.SUBMIT_ENTRY_SUCCESS:
      return updateObj(state, { entries: state.entries.concat(action.payload.entry) })
    case actionTypes.GET_INPUTS_FROM_DATA:
      return updateObj(state, action.payload)
    case actionTypes.ADD_TAG:
      const name = action.payload.name;
      const value = action.payload.value;
      return updateObj(state, { [name]: state[name].concat(value) })
    default: return state
  }
}