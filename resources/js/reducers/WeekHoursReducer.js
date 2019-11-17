import { FETCH_WEEK_HOURS_FULFILLED } from "../constants/action-types";
export default function reducer(state={
    days: null,
    diff: 0
}, action){
    switch (action.type){
        case FETCH_WEEK_HOURS_FULFILLED: {
            return {
              ...state,
              diff: action.payload.diff,
            }
          }
    }
    return state;
}