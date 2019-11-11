import { FETCH_USER_LOGGED } from "../constants/action-types";
export default function reducer(state={
    user: null,
    fetched: false,
    error: null
}, action){
    switch (action.type){
        case FETCH_USER_LOGGED: {
            return {
              ...state,
              fetched: true,
              user: action.payload.user
            }
          }
    }
    return state;
}