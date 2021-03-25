import { updateObj } from '../../utility/utility'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
  data: [],
  subs: []
}

//TODO: error

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DATA_SUCCESS:
      return updateObj(state, action.payload)
    default: return state
  }
}