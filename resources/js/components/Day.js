
import React from "react";
import Hour from "./Hour";
import { connect } from "react-redux";
import { fetchDayHours } from '../actions/entry';

class Day extends React.Component{
    constructor(props){
        super(props);

          this.handleClick = this.handleClick.bind(this);
          this.updateDayTotal = this.updateDayTotal.bind(this);
    }

    componentDidMount(){
        if(this.props.isCurrent) {
            const id = this.props.day;
            const yourElement = document.getElementById(id);
            const y = yourElement.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({top: y, behavior: 'smooth'})   
        }
    }

    updateDayTotal(day_id){
        this.props.dispatch(fetchDayHours(day_id));
    }



    handleClick() {
        //event.preventDefault();
        this.state.hours.push({'entry_id':'', entry_out: ''});
        this.setState({
            id: this.state.id,
            hours: this.state.hours,
            day: this.state.day,
            isCurrent: this.state.isCurrent,
            weekDayName: this.state.weekDayName,
            diff: this.state.diff
        });   
    }

    render() {
        const listItems = this.props.hours.map((hour, index) =>
        
            <Hour updateDayTotal={this.updateDayTotal} updateWeekTotal={this.props.updateWeekTotal} key={index} entry_in={hour.entry_in} entry_out={hour.entry_out} day_id={this.props.id} id={hour.id} diff={hour.diff}/>

        );

        return (
            <div className="days mb-1em">
                <span id={this.props.day} className="day" ><span className="day-text">{this.props.weekDayName} - {this.props.day} </span><span className="oi oi-plus" onClick={this.handleClick} ></span></span>
                {listItems}
                <span className="text-center total-day">{this.props.diff}</span>
            </div>
        );
    }
    
}
;
function mapStateToProps(state, ownProps) {

    let diffVal = state.day.diff ? state.day.diff : ownProps.diff;

    return {
        id: ownProps.id,
        hours: ownProps.hours,
        day: ownProps.day,
        isCurrent: ownProps.isCurrent,
        weekDayName: ownProps.weekDayName,
        diff: diffVal
    }
}
export default connect(mapStateToProps)(Day)