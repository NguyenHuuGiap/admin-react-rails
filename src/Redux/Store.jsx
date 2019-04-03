import { createStore } from 'redux';

let initState = {
  accounts: [],
  authToken: null
}

let reducer = (state = initState, action) => {
  switch (action.type) {
      case "Login":
        return { ...state, authToken: action.authToken }
      case "LOGOUT":
        return { ...state, authToken: null }
      case "CHANGE_EDIT":
        return { ...state, editStatus: !state.editStatus }
      case "LIST_USER":
        return { ...state, accounts: action.accounts }
      case "ADD_ITEM":
        return { ...state, num: [...state.num, action.newItem] }
      case "REMOVE_USER":
        const accounts = state.accounts.filter(account => account.id !== action.idAccount)
        return { ...state, accounts: accounts }
      default:
        break;
  }
  return state
}

let store = createStore(reducer)
// subscribe
// store.subscribe(() => {
//   console.log("subscribe", store.getState());
// })

export default store
