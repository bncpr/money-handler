import axios from '../axios'
import { getMaxKey } from '../utility/utility'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { changeYear } from './dashboardSlice'

const getYear = (year) => axios.get(`years/${year}.json`).then(res => res.data)
const getShallowData = () => axios.get('years.json?shallow=true').then(res => res.data)

export const initData = createAsyncThunk(
  'data/initData',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const shallowData = await getShallowData()
      const recentYear = getMaxKey(shallowData)
      dispatch(changeYear(recentYear))
      // dispatch(getYearThunk(recentYear))
      return shallowData
    } catch (error) {
      return rejectWithValue({ error: error.message })
    }
  }
)

export const getYearThunk = createAsyncThunk(
  'data/getYear',
  async (year, { rejectWithValue }) => {
    try {
      const data = await getYear(year)
      return { year, data }
    } catch (error) {
      return rejectWithValue({ error: error.message })
    }
  }
)