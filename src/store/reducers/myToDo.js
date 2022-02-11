import { GET_MYTODO } from "../types";
import { CHANGE_MYTODO } from '../types'
import { CHANGE_COMPLETED } from '../types'

const initialState = {
  myToDo: [],
  completed: false,
};

const myToDoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MYTODO:
      return {
        ...state,
        myToDo: payload
      };
    case CHANGE_MYTODO:
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
