import { updateObj } from '../../utility/utility'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
  date: new Date().toJSON().slice(0, 10),
  payer: '',
  value: '',
  category: '',
  subcategories: {}
}

export const entryReducer = (state = initialState, action) => {
  const payload = action.payload
  switch (action.type) {
    case actionTypes.CHANGE_VALUE:
      return updateObj(state, { [payload.name]: payload.value })
    case actionTypes.TICK_SUBCATEGORY_VALUE:
      return updateObj(state, { 'subcategories': updateObj(state['subcategories'], { [payload.name]: !payload.checked }) })
    default: return state
  }
}