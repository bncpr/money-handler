import { createSlice } from "@reduxjs/toolkit";

export const showTagHandler = (name) => {
  return dispatch => {
    dispatch(resetTagValue)
    dispatch(toggleShowValue(name))
  }
}

const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    showTag: '',
    tagValue: ''
  },
  reducers: {
    resetTagState(state) { Object.assign(state, { showTag: '', tagValue: '' } )},
    toggleShowValue(state, action) {
      const name = action.payload
      const value = state.showTag === name ? '' : name
      state.showTag = value
    },
    setTagValue(state, action) { state.tagValue = action.payload },
    resetTagValue(state) { state.tagValue = '' }
  }
})

export const tagReducer = tagSlice.reducer
export const { toggleShowValue, setTagValue, resetTagValue, resetTagState } = tagSlice.actions