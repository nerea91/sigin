import axios from "axios";
import { FETCH_LOGIN_IN_FULFILLED, FETCH_LOGIN_OUT_FULFILLED, FETCH_CURRENT_FULFILLED, FETCH_WEEKS_FULFILLED, FETCH_WEEK_HOURS_FULFILLED,
  FETCH_DAY_HORS_FULFILLED} from "../constants/action-types";

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

export function fetchWeeks(){
  return function (dispatch) {
    axios.get("api/history")
    .then((response) => {
      dispatch({type: FETCH_WEEKS_FULFILLED, payload: response.data});
    })
    .catch((error) => {

    })
  }
}

export function fetchWeekHours(day_id){
  return function (dispatch) {
    axios.get("api/week-hours/"+day_id)
        .then((response) => {
          dispatch({type: FETCH_WEEK_HOURS_FULFILLED, payload: response.data});
        })
        .catch((error) => {
            
        })
  }
}

export function fetchDayHours(day_id) {
  return function (dispatch) {
    axios.get("api/day-hours/"+day_id)
    .then((response) => {
      dispatch({type: FETCH_DAY_HORS_FULFILLED, payload: response.data}); 
    })
    .catch((error) => {
        console.log('error', error);
        
    })
  }
}