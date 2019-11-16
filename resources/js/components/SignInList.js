
import React from "react";
import Week from './Week';

class SignInList extends React.Component{
    constructor(){
        super();
        this.state = {
            weeks: [],
        }
    }

    componentDidMount(){
        axios.get("api/history")
        .then((response) => {
            this.setState({weeks: Object.values(response.data.weeks)});
            
        })
        .catch((error) => {
            console.log('error', error);
            //dispatch({type: "FETCH_USERS_REJECTED", payload: error});
        })
    }

    render() {
        const listItems = this.state.weeks.map((week, index) =>
        <div key={index}>
            <Week days={week.days} diff={week.diffTotal} />
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