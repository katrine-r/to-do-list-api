import { GET_MYTODO } from '../types'
import { CHANGE_MYTODO } from '../types'
import { CHANGE_COMPLETED } from '../types'

export const getMyToDo = payload => {
  return {
    type: GET_MYTODO,
    payload
  }
}

export const changeMyToDo = payload => {
    return {
      type: CHANGE_MYTODO,
      payload
    }
}

export const changeCompleted = payload => {
    return {
      type: CHANGE_COMPLETED,
      payload
    }
}