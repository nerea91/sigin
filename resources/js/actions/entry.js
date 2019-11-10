import axios from "axios";
import { FETCH_CURRENT_DAY, FETCH_CURRENT_FULFILLED} from "../constants/action-types";

export function fetchCurrentDay(){
    return function (dispatch) {
      axios.get("api/current")
      .then((response) => {
        dispatch({type: FETCH_CURRENT_FULFILLED, payload: response.data});
      })
      .catch((error) => {
        
      })
    }
  }