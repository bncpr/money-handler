import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'





const dataSlice = createSlice({
  name: 'data',
  initialState: {

  },
  extraReducers: {
    'data/initData/fulfilled': (state, action) => Object.assign(state, action.payload),
    'data/getYear/fulfilled': (state, action) => {
      const { year, data } = action.payload
      state[year] = data
    }
  },

})

export const dataReducer = dataSlice.reducer