import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'
import { resetEntryState } from './entrySlice'
import { showError } from './errorSlice'

export const getEntriesThunk = createAsyncThunk(
  'data/getEntries',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get('entries/entries.json')
      const entries = Object.values(response.data)
      dispatch(getInputsFromEntries(entries))
      return entries
    } catch (error) {
      dispatch(showError({ error: true, errorMessage: 'Failed to fetch data' }))
      return rejectWithValue({ error: error.message })
    }
  }
)

export const submitEntryThunk = createAsyncThunk(
  'data/submitEntry',
  async (entry, { dispatch, rejectWithValue }) => {
    try {
      const newEntry = { ...entry }
      const subs = []
      Object.keys(entry.subcategories)
        .forEach(key => {
          if (entry.subcategories[key]) subs.push(key)
        })
      newEntry.subcategories = subs
      await axios.post('entries/entries.json', newEntry)
      dispatch(resetEntryState())
      return newEntry
    } catch (error) {
      dispatch(showError({ error: true, errorMessage: 'Failed to submit entry' }))
      return rejectWithValue({ error: error.message })
    }
  }
)

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    entries: [],
    subs: [],
    categories: [],
    payers: []
  },
  reducers: {
    getInputsFromEntries: {
      reducer(state, action) { Object.assign(state, action.payload) },
      prepare(data) {
        const [categories, subs, payers] = [[], [], []]
        data.forEach(entry => {
          const { category, payer, subcategories } = entry
          if (!categories.includes(category) && category !== '') categories.push(category)
          if (!payers.includes(payer) && payer !== '') payers.push(payer)
          if (subcategories) {
            subcategories.forEach(sub => {
              if (!subs.includes(sub) && sub !== '') subs.push(sub)
            })
          }
        })
        return { payload: { categories, subs, payers } }
      }
    },
    addTag(state, action) {
      const { name, value } = action.payload
      let dataName = '';
      console.log(name, value)
      switch (name) {
        case 'category':
          dataName = 'categories'
          break
        case 'payer':
          dataName = 'payers'
          break
        case 'tag':
          dataName = 'subs'
          break
        default: throw new Error
      }
      state[dataName].push(value)
    },
  },
  extraReducers: {
    [getEntriesThunk.fulfilled]: (state, action) => {
      state.entries = action.payload
    },
    [submitEntryThunk.fulfilled]: (state, action) => {
      state.entries.push(action.payload)
    }
  }
})

const { getInputsFromEntries } = dataSlice.actions
export const dataReducer = dataSlice.reducer
export const { addTag } = dataSlice.actions