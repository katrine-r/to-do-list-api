import { combineReducers } from 'redux'
import myToDoReducer from './myToDo'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux';

const rootReducer = combineReducers({
  myToDo: myToDoReducer,
})

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store