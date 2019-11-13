
import React from "react";
import Day from './Day';

class SignInList extends React.Component{
    constructor(){
        super();
        this.state = {
            days: [{day: 'aaaa', id: 1,hours: [{'entry_in': 1, 'entry_out': 2}]}],
        }
    }

    componentDidMount(){
        //this.props.dispatch(fetchDays());
    }

    render() {
        const listItems = this.state.days.map((day) =>
        <div key={day.id}><Day day={day.day} id={day.id} hours={day.hours} />
        </div>
        );

        return (
            <div>
                {listItems}
            </div>
        );
    }
    
}
export default SignInList;