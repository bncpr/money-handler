import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const getData = () => {
  return dispatch => {
    axios.get('/entries.json')
      .then(res => {
        const data = Object.values(res.data['entries'])
        const subs = res.data['subcategories']
        
        dispatch(getDataSuccess(data, subs))
      })
      .catch(err => {
        dispatch(getDataFail(err.message))
      })
  }
}

export const getDataSuccess = (data, subs) => {
  return {type: actionTypes.GET_DATA_SUCCESS, payload: {data, subs}}
}

export const getDataFail = (err) => {
  return {type: actionTypes.GET_DATA_FAIL, err}
}