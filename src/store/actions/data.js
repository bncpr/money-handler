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

export const getEntryFormData = () => {
  return dispatch => {
    dispatch(getEntryFormDataInit())
    dispatch(getCategories())
    dispatch(getSubcategories())
  }
}

export const getEntryFormDataInit = () => {
  return { type: actionTypes.GET_ENTRY_FORM_DATA_INIT }
}

export const getCategories = () => {
  return dispatch => {
    axios.get('/entries/categories.json')
      .then(res => {
        const categories = Object.keys(res.data).map(key => res.data[key]['category'])
        dispatch(getCategoriesSuccess(categories))
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

export const getSubcategories = () => {
  return dispatch => {
    axios.get('/entries/subs.json')
      .then(res => {
        const subs = Object.keys(res.data).map(key => res.data[key]['sub'])
        dispatch(getSubcategoriesSuccess(subs))
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

export const addTag = (name, value) => {
  return { type: actionTypes.ADD_TAG, payload: { name, value } }
}

export const submitTag = (name, value) => {
  return dispatch => {
    dispatch(addTag(name, value))
    const tag = name === 'subs' ? 'sub' : name === 'categories' ? 'category' : ''
    axios.post(`entries/${name}.json`, { [tag]: value })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}