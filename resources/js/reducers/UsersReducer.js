import { FETCH_USERS_FULFILLED, FETCH_USERS_REJECTED, FETCH_USER_REJECTED,  FETCH_USER_FULFILLED} from "../constants/action-types";
export default function reducer(state={
    users: [],
    user: null,
    fetched: false,
    redirect: false,
    error: null
}, action){
switch (action.type){
  case FETCH_USERS_REJECTED: {
        return {
          ...state,
          fetched: false,
          error: action.payload
        }
      }
  case FETCH_USERS_FULFILLED: {
        return {
          ...state,
          fetched: true,
          users: action.payload.users,
        }
      }
  case FETCH_USER_REJECTED: {
        return {
          ...state,
          fetched: false,
          error: action.payload
        }
      }
  case FETCH_USER_FULFILLED: {
        return {
          ...state,
          fetched: true,
          redirect: true,
          user: action.payload.user
        }
      }
  }
return state;
}