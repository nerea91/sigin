
import React from "react";
import Hour from "./Hour";

class Day extends React.Component{
    constructor(props){
        super(props);

        const { id = '',
            hours = [],
            day = '',
          } = props;
          this.handleClick = this.handleClick.bind(this);
          this.state = props;
    }

    componentDidMount(){
        
    }

    componentDidUpdate(prevProps) {
        console.log('update');
    }

    handleClick() {
        //event.preventDefault();
        console.log('click');
        this.state.hours.push({'entry_id':'', entry_out: ''});
        this.setState({
            id: this.state.id,
            hours: this.state.hours,
            day: this.state.day
        });
    }

    render() {
        const listItems = this.state.hours.map((hour, index) =>
        
            <Hour key={index} entry_in={hour.entry_in} entry_out={hour.entry_out} day_id={this.props.id} id={hour.id} diff={hour.diff}/>

        );

        return (
            <div className="days mb-1em">
                <span className="day" >{this.state.day} <span className="oi oi-plus" onClick={this.handleClick} ></span></span>
                {listItems}
            </div>
        );
    }
    
}

export default Day;