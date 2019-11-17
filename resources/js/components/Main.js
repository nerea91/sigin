import React from 'react';
import { connect } from "react-redux";
import Cat from "./Cat";

import { fetchCurrentDay,  loginIn, loginOut} from '../actions/entry';

class Main extends React.Component{
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        this.props.dispatch(fetchCurrentDay());
    }

    handleClick(value, event) {
        event.preventDefault();
        if(value == 'login')
            this.props.dispatch(loginIn());
        else if(value == 'logout')
            this.props.dispatch(loginOut());
    }

    render(){
        return (
            <div id="entry">
                {  
                    this.props.fetchHasLogInHour &&  this.props.fetchHasLogOutHour || ! this.props.input ?
                    <div><p className="log-in-out-text">Fichar entrada</p><a href="login" onClick={(event) => this.handleClick('login', event)}><img src="img/login-xxl.png"/></a> </div> :
                    <div><p className="log-in-out-text">Fichar salida</p><a href="logout" onClick={(event) => this.handleClick('logout', event)}><img src="img/logout-xxl.png"/></a></div>
                }
                <div className="cat">
                <Cat /*type="gif"*/ text="Get to work!" />
                <img id="loader" src="img/loader.gif" />
                </div>
                
            </div>
        );
    };

}

function mapStateToProps(state) {
    return {
        input: state.entry.input,
        fetchHasLogInHour: state.entry.fetchHasLogInHour,
        fetchHasLogOutHour: state.entry.fetchHasLogOutHour,
        error: state.entry.error
    }
}
export default connect(mapStateToProps)(Main)