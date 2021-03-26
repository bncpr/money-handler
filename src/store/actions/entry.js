import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const changeValue = (name, value) => {
  return { type: actionTypes.CHANGE_VALUE, payload: { name, value } }
}

export const tickSubcategoryValue = (name, checked) => {
  return { type: actionTypes.TICK_SUBCATEGORY_VALUE, payload: { name, checked } }
}

export const submitEntry = (entry) => {
  return dispatch => {
    const newEntry = { ...entry }
    const subs = [];
    Object.keys(newEntry['subcategories'])
      .forEach(key => {
        if (newEntry['subcategories'][key]) subs.push(key)
      })
    newEntry['subcategories'] = subs
    axios.post('entries/entries.json', newEntry)
      .then(res => {
        alert('submit')
        dispatch(submitEntrySuccess(newEntry))
      })
      .catch(err => {
        dispatch(submitEntryFail(err))
      })
  }
}

export const submitEntrySuccess = (entry) => {
  return { type: actionTypes.SUBMIT_ENTRY_SUCCESS, payload: { entry } }
}

export const submitEntryFail = (err) => {
  return { type: actionTypes.SUBMIT_ENTRY_FAIL, payload: { err } }
}

