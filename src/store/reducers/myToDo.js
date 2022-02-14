import { GET_MYTODOLIST } from "../types";
import { ADD_TODO } from '../types'
import { CHANGE_COMPLETED } from '../types'

const initialState = {
  myToDo: [],
  completed: false,
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
    case CHANGE_COMPLETED:
      return {
        ...state,
        completed: payload
      };
    default:
      return state;
  }
};

export default myToDoReducer;
