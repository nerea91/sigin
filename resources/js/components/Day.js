
import React from "react";
import Hour from "./Hour";

class Day extends React.Component{
    constructor(props){
        super(props);

        const { id = '',
            hours = [],
            day = '',
            isCurrent = false,
            weekDayName = '',
            updateWeekTotal = null,
            diff = ''
          } = props;
          this.handleClick = this.handleClick.bind(this);
          this.updateDayTotal = this.updateDayTotal.bind(this);
          this.state = props;
    }

    componentDidMount(){
        if(this.state.isCurrent) {
            const id = this.props.day;
            const yourElement = document.getElementById(id);
            const y = yourElement.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({top: y, behavior: 'smooth'})   
        }
    }

    updateDayTotal(day_id){

        axios.get("api/day-hours/"+day_id)
        .then((response) => {
           this.setState({
                id: this.state.id,
                hours: this.state.hours,
                day: this.state.day,
                isCurrent: this.state.isCurrent,
                weekDayName: this.state.weekDayName,
                diff: response.data.diff
            });
            
        })
        .catch((error) => {
            console.log('error', error);
            //dispatch({type: "FETCH_USERS_REJECTED", payload: error});
        })
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
        const listItems = this.state.hours.map((hour, index) =>
        
            <Hour updateDayTotal={this.updateDayTotal} updateWeekTotal={this.props.updateWeekTotal} key={index} entry_in={hour.entry_in} entry_out={hour.entry_out} day_id={this.props.id} id={hour.id} diff={hour.diff}/>

        );

        return (
            <div className="days mb-1em">
                <span id={this.state.day} className="day" ><span className="day-text">{this.state.weekDayName} - {this.state.day} </span><span className="oi oi-plus" onClick={this.handleClick} ></span></span>
                {listItems}
                <span className="text-center total-day">{this.state.diff}</span>
            </div>
        );
    }
    
}

export default Day;