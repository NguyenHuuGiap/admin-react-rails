import { createStore } from 'redux';
import { access } from 'fs';

let oldState = {
  authToken: null
}

let reducer = (state = oldState, action) => {
  switch (action.type) {
      case "Login":
          return { ...state, authToken: action.authToken }
      case "CHANGE_EDIT":
          return { ...state, editStatus: !state.editStatus }
      case "ADD_ITEM":
          return { ...state, num: [...state.num, action.newItem] }
      case "DEL_ITEM":
          return { ...state, num: state.num.filter((val, key) => key !== action.index) }
      default:
          break;
  }
  return state
}

let store = createStore(reducer)
// subscribe
store.subscribe(() => {
  console.log("subscribe", store.getState());
})

// store.dispatch({ type: 'CHANGE_EDIT' })

// store.dispatch({ type: 'ADD_ITEM', newItem: "tai nghe" })

// store.dispatch({ type: 'DEL_ITEM', index: 0 })

export default store
