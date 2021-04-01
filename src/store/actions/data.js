import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const getEntries = () => {
  return dispatch => {
    axios.get('/entries/entries.json')
      .then(res => {
        const data = Object.values(res.data)
        dispatch(getEntriesSuccess(data))
        dispatch(getInputsFromData(data))
      })
      .catch(err => {
        dispatch(getEntriesFail(err.message))
      })
  }
}

export const getEntriesSuccess = (entries) => {
  return { type: actionTypes.GET_ENTRIES_SUCCESS, payload: { entries } }
}

export const getEntriesFail = (err) => {
  return { type: actionTypes.GET_ENTRIES_FAIL, payload: { err } }
}

export const getInputsFromData = (data) => {
  const [categories, subs, payers] = [[], [], []]
  data.forEach(entry => {
    let category = entry.category
    let payer = entry.payer
    let subcategories = entry.subcategories
    if (!categories.includes(category) && category !== '') categories.push(category)
    if (!payers.includes(payer) && payer !== '') payers.push(payer)
    if (subcategories) {
      subcategories.forEach(sub => {
        if (!subs.includes(sub) && sub !== '') subs.push(sub)
      })
    }
  })
  return { type: actionTypes.GET_INPUTS_FROM_DATA, payload: { categories, subs, payers } }
}

export const addTag = (name, value) => {
  return { type: actionTypes.ADD_TAG, payload: { name, value } }
}