import React from 'react';
import { connect } from "react-redux";
import Cat from "./Cat";

import { fetchCurrentDay } from '../actions/entry';

class Main extends React.Component{
    constructor(){
        super();
        //this.handleBtnDelete = this.handleBtnDelete.bind(this);
    }
    componentDidMount(){
        this.props.dispatch(fetchCurrentDay());
    }

    render(){
        return (
            <div id="entry">
                <p>Fichar entrada</p>
                <img src="img/login-xxl.png"/>
                <div className="cat">
                <Cat /*type="gif"*/ text="Get to work!" />
                </div>
                
            </div>
        );
    };

}

function mapStateToProps(state) {
    return {
        fetchHasLogInHour: state.main
    }
}
export default connect(mapStateToProps)(Main)