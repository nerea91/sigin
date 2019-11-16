
import React from "react";
import Day from './Day';

class Week extends React.Component{
    constructor(props){
        super(props);
        this.state = props;
    }

    componentDidMount(){
      
    }

    render() {
        const listItems = this.state.days.map((day) =>
        <div key={day.id}>
            <Day weekDayName={day.weekDayName} day={day.date} id={day.id} hours={day.inputs} isCurrent={day.isCurrent} />
        </div>
        );

        return (
            <fieldset>
                {listItems}

                <div className="text-center">
                    <span>{this.state.diff}</span>
                </div>
            </fieldset>
            
        );
    }
    
}
export default Week;