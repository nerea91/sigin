
import React from "react";
import Hour from "./Hour";

class Day extends React.Component{
    constructor(props){
        super(props);

        const { id = '',
            hours = [],
            day = '',
          } = props;
        
    }

    componentDidMount(){
        
    }

    render() {
        const listItems = this.props.hours.map((hour, index) =>
        
            <Hour key={index} entry_in={hour.entry_in} entry_out={hour.entry_out} day_id={this.props.id} id={hour.id}/>

        );

        return (
            <div>
                <span>{this.props.day}</span>
                {listItems}
            </div>
        );
    }
    
}

export default Day;