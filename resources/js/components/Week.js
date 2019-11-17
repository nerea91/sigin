
import React from "react";
import Day from './Day';

class Week extends React.Component{
    constructor(props){
        super(props);
        this.state = props;
        this.updateWeekTotal= this.updateWeekTotal.bind(this);
    }

    componentDidMount(){
      
    }

    updateWeekTotal(day_id){

        axios.get("api/week-hours/"+day_id)
        .then((response) => {
           this.setState({
                weeks: this.state.weeks,
                diff: response.data.diff
            });
            
        })
        .catch((error) => {
            console.log('error', error);
            //dispatch({type: "FETCH_USERS_REJECTED", payload: error});
        })
    }

    render() {
        const listItems = this.state.days.map((day) =>
        <div key={day.id}>
            <Day updateWeekTotal={this.updateWeekTotal} diff={day.diff} weekDayName={day.weekDayName} day={day.date} id={day.id} hours={day.inputs} isCurrent={day.isCurrent} />
        </div>
        );

        return (
            <fieldset>
                {listItems}

                <div className="text-center">
                    <span className="total-week">{this.state.diff}</span>
                </div>
            </fieldset>
            
        );
    }
    
}
export default Week;