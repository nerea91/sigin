import axios from "axios";
import { FETCH_USERS_FULFILLED, FETCH_USERS_REJECTED, FETCH_USER_REJECTED,  FETCH_USER_FULFILLED, FETCH_USER_LOGGED} from "../constants/action-types";

export function fetchUsers(){
    return function (dispatch) {
      axios.get("api/users")
      .then((response) => {
        dispatch({type: FETCH_USERS_FULFILLED, payload: response.data});
      })
      .catch((error) => {
        dispatch({type: FETCH_USERS_REJECTED, payload: error});
      })
    }
  }

  export function fetchLoggedUser(){
    return function (dispatch) {
        axios.get("api/logged")
        .then((response) => {
          dispatch({type: FETCH_USER_LOGGED, payload: response.data});
        })
        .catch((error) => {
            console.log('error', error);
            //dispatch({type: "FETCH_USERS_REJECTED", payload: error});
        })
      }
  }

  export function fetchSigIn(values){
    return function (dispatch) {
        axios.post("api/login", values)
        .then((response) => {
          
          //dispatch({type: FETCH_USER_LOGGED, payload: response.data});
        })
        .catch((error) => {
            console.log('error', error);
            //dispatch({type: "FETCH_USERS_REJECTED", payload: error});
        })
      }
  }