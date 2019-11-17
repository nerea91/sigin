import { FETCH_DAY_HORS_FULFILLED, ADD_HOUR } from "../constants/action-types";
export default function reducer(state={
    id: null,
    hours: null,
    day: null,
    isCurrent: null,
    weekDayName: null,
    diff: null
}, action){
    switch (action.type){
        case FETCH_DAY_HORS_FULFILLED: {
            return {
              ...state,
              diff: action.payload.diff,
            }
          }
    }
    return state;
}