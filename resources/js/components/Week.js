
import React from "react";
import { connect } from "react-redux";
import { fetchWeekHours } from '../actions/entry';
import Day from './Day';

class Week extends React.Component{
    constructor(props){
        super(props);
        this.updateWeekTotal= this.updateWeekTotal.bind(this);
    }

    componentDidMount(){
      
    }

    updateWeekTotal(day_id){
        this.props.dispatch(fetchWeekHours(day_id));
    }

    render() {
        const listItems = (this.props && this.props.days) ? this.props.days.map((day, index) =>
        <div key={index}>
            <Day updateWeekTotal={this.updateWeekTotal} diff={day.diff} weekDayName={day.weekDayName} day={day.date} id={day.id} hours={day.inputs} isCurrent={day.isCurrent} />
        </div>
        ) : [];

        return (
            <fieldset>
                {listItems}

                <div className="text-center">
                    <span className="total-week">{this.props.diff}</span>
                </div>
            </fieldset>
            
        );
    }
    
}

function mapStateToProps(state, ownProps) {

    if(state.weekHour.diff) {

        return {
            diff: state.weekHour.diff,
            days: ownProps.days
          }
    }

    return {
      diff: ownProps.diff,
      days: ownProps.days
    }
}
export default connect(mapStateToProps)(Week)