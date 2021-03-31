import { updateObj } from '../../../utility/utility'

export const init = (value) => {
  return { showTag: value, tagValue: value }
}

export const tagReducer = (state, action) => {
  switch (action.type) {
    case 'RESET':
      return init('')
    case 'TOGGLE_SHOW_TAG':
      const name = action.payload.name
      return updateObj(state, { showTag: state.showTag === name ? '' : name })
    case 'SET_TAG_VALUE':
      return updateObj(state, { tagValue: action.payload.value })
    case 'RESET_TAG_VALUE':
      return updateObj(state, { tagValue: '' })
    default:
      throw new Error('Unknown action')
  }
}