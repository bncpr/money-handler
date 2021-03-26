import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const getData = () => {
  return dispatch => {
    dispatch(getEntries())
    dispatch(getSubcategories())
  }
}

export const getSubcategories = () => {
  return dispatch => {
    axios.get('/entries/subcategories.json')
      .then(res => {
        dispatch(getSubcategoriesSuccess(res.data))
      })
      .catch(err => {
        dispatch(getSubcategoriesFail(err))
      })
  }
}

export const getSubcategoriesSuccess = (subcategories) => {
  return { type: actionTypes.GET_SUBCATEGORIES_SUCCESS, payload: { subcategories } }
}

export const getSubcategoriesFail = (err) => {
  return { type: actionTypes.GET_SUBCATEGORIES_FAIL, payload: { err } }
}

export const getEntries = () => {
  return dispatch => {
    axios.get('/entries/entries.json')
    .then(res => {
      const data = Object.values(res.data)
      dispatch(getEntriesSuccess(data))
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