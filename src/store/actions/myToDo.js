import { GET_MYTODOLIST } from '../types'
import { ADD_TODO } from '../types'
import { REMOVE_TODO } from '../types'
import { CHANGE_COMPLETED } from '../types'
import { FILTERED_MYTODOLIST } from '../types'
import { EDIT_TODO } from '../types'

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

export const removeToDo = payload => {
  return {
    type: REMOVE_TODO,
    payload
  }
}

export const changeCompleted = payload => {
  return {
    type: CHANGE_COMPLETED,
    payload
  }
}

export const filteredMyToDoList = payload => {
  return {
    type: FILTERED_MYTODOLIST,
    payload
  }
}

export const editToDo = payload => {
  return {
    type: EDIT_TODO,
    payload
  }
}