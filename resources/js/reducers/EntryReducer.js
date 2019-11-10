import { FETCH_CURRENT_FULFILLED } from "../constants/action-types";
export default function reducer(state={
    day: null,
    fetched: false,
    fetchHasLogInHour: false,
    error: null
}, action){
    switch (action.type){
        case FETCH_CURRENT_FULFILLED: {
     
            return {
              ...state,
              fetched: true,
              day: action.payload.day,
              fetchHasLogInHour: action.payload.hasLogInHour
            }
          }
    }
    return state;
}