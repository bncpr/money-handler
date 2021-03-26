import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const getEntries = () => {
  return dispatch => {
    dispatch(getEntriesInit())
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

export const getEntriesInit = () => {
  return { type: actionTypes.GET_ENTRIES_INIT }
}

export const getEntriesSuccess = (entries) => {
  return { type: actionTypes.GET_ENTRIES_SUCCESS, payload: { entries } }
}

export const getEntriesFail = (err) => {
  return { type: actionTypes.GET_ENTRIES_FAIL, payload: { err } }
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
export const getCategories = () => {
  return dispatch => {
    axios.get('/entries/categories.json')
      .then(res => {
        dispatch(getCategoriesSuccess(res.data))
      })
      .catch(err => {
        dispatch(getCategoriesFail(err))
      })
  }
}

export const getCategoriesSuccess = (categories) => {
  return { type: actionTypes.GET_CATEGORIES_SUCCESS, payload: { categories } }
}

export const getCategoriesFail = (err) => {
  return { type: actionTypes.GET_CATEGORIES_FAIL, payload: { err } }
}
