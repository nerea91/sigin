import { combineReducers } from "redux"
import { reducer as formReducer } from 'redux-form';
import users from "./UsersReducer"
import nav from "./NavReducer"
import entry from "./EntryReducer"
import week from "./WeekReducer"
import weekHour from "./WeekHoursReducer"
import day from "./DayReducer"

export default combineReducers({
    users,
    nav,
    form: formReducer,
    entry,
    week,
    weekHour,
    day
})
