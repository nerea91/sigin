
import React from 'react';
import { connect } from "react-redux";
import { fetchWeeks } from '../actions/entry';
import Week from './Week';

class SignInList extends React.Component{
    constructor(){
        super();
    }

    componentDidMount(){
        this.props.dispatch(fetchWeeks());
    }

    render() {
        const listItems = this.props && this.props.weeks ? this.props.weeks.map((week, index) =>
        <div key={index}>
            <Week days={week.days} diff={week.diffTotal} />
        </div>
        ): '';

        return (
            <div id="days-container">
                {listItems}
            </div>
        );
    }
    
}

function mapStateToProps(state) {
    return {
      weeks: state.week.weeks,
    }
}
export default connect(mapStateToProps)(SignInList)