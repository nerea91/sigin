
import React from "react";
import Day from './Day';

class SignInList extends React.Component{
    constructor(){
        super();
        this.state = {
            days: [],
        }
    }

    componentDidMount(){
        axios.get("api/history")
        .then((response) => {
            this.setState({days: Object.values(response.data.days)});
            
        })
        .catch((error) => {
            console.log('error', error);
            //dispatch({type: "FETCH_USERS_REJECTED", payload: error});
        })
    }

    render() {
        const listItems = this.state.days.map((day) =>
        <div key={day.id}>
            <Day day={day.date} id={day.id} hours={day.inputs}/>
        </div>
        );

        return (
            <div id="days-container">
                {listItems}
            </div>
        );
    }
    
}
export default SignInList;