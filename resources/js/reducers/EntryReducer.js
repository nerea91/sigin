import { FETCH_CURRENT_FULFILLED } from "../constants/action-types";
export default function reducer(state={
    input: null,
    fetched: false,
    fetchHasLogInHour: false,
    fetchHasLogOutHour: false,
    error: null
}, action){

  if(action.payload) {
    return {
      ...state,
      fetched: true,
      input: action.payload.input,
      fetchHasLogInHour: action.payload.input.entry_in ? true : false,
      fetchHasLogOutHour: action.payload.input.entry_out ? true : false
    }
  }
  return state;
}