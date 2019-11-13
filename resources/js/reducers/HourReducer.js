import { UPDATED_HOUR } from "../constants/action-types";
export default function reducer(state={
    entry_in: null,
    entry_out: null,
    day_id : null,
    id: null
}, action){
    switch (action.type){
        case UPDATED_HOUR: {
            return {
              ...state,
              entry_in: action.payload.input.entry_in,
              entry_out: action.payload.input.entry_out,
              day_id : action.payload.input.day_id,
              id: action.payload.input.id
            }
          }
    }
    return state;
}