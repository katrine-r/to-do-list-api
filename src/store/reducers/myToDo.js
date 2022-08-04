import { GET_MYTODOLIST } from "../types";
import { ADD_TODO } from '../types'
import { REMOVE_TODO } from '../types'
import { CHANGE_COMPLETED } from '../types'
import { FILTERED_MYTODOLIST } from '../types'
import { EDIT_TODO } from '../types'

const initialState = {
  myToDo: [],
  filteredToDos: [],
  isEdited: true
};

const myToDoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MYTODOLIST:
      return {
        ...state,
        myToDo: payload
      };
    case ADD_TODO:
      return {
        ...state,
        myToDo: payload
      };
    case REMOVE_TODO:
      return {
        ...state,
        myToDo: payload
      };
    case CHANGE_COMPLETED:
      return {
        ...state,
        myToDo: state.completed = payload
      };
    case FILTERED_MYTODOLIST:
      return {
        ...state,
        filteredToDos: payload
      };
    case EDIT_TODO:
      return {
        ...state,
        isEdited: payload
      };
    default:
      return state;
  }
};

export default myToDoReducer;
