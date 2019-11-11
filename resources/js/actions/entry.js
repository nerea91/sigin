import axios from "axios";
import { FETCH_LOGIN_IN_FULFILLED, FETCH_LOGIN_OUT_FULFILLED, FETCH_CURRENT_FULFILLED} from "../constants/action-types";

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

export function loginIn(){
  return function (dispatch) {
    axios.get("api/current/log-in")
    .then((response) => {
      dispatch({type: FETCH_LOGIN_IN_FULFILLED, payload: response.data});
    })
    .catch((error) => {

    })
  }
}

export function loginOut(){
  return function (dispatch) {
    axios.get("api/current/log-out")
    .then((response) => {
      dispatch({type: FETCH_LOGIN_OUT_FULFILLED, payload: response.data});
    })
    .catch((error) => {

    })
  }
}