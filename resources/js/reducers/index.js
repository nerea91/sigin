import { combineReducers } from "redux"
import { reducer as formReducer } from 'redux-form';
import users from "./UsersReducer"
import nav from "./NavReducer"

export default combineReducers({
    users,
    nav,
    form: formReducer
})
