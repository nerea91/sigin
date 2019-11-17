import { FETCH_WEEKS_FULFILLED } from "../constants/action-types";
export default function reducer(state={
    weeks: null,
}, action){
    switch (action.type){
        case FETCH_WEEKS_FULFILLED: {
            return {
              ...state,
              weeks: Object.values(action.payload.weeks),
            }
          }
    }
    return state;
}