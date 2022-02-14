import { GET_MYTODOLIST } from '../types'
import { ADD_TODO } from '../types'
import { CHANGE_COMPLETED } from '../types'

export const getMyToDoList = payload => {
  return {
    type: GET_MYTODOLIST,
    payload
  }
}

export const addToDo = payload => {
  return {
    type: ADD_TODO,
    payload
  }
}

export const changeCompleted = payload => {
    return {
      type: CHANGE_COMPLETED,
      payload
    }
}