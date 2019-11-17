import React from 'react';
import { connect } from "react-redux";
import { fetchLoggedUser } from '../actions/user';

class Nav extends React.Component{
    constructor(){
        super();
        //this.handleBtnDelete = this.handleBtnDelete.bind(this);
    }
    componentDidMount(){
        this.props.dispatch(fetchLoggedUser());
    }

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container px-2 px-sm-3">
                <a className="navbar-brand text-white" href="/">Home</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                   
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            
                            { this.props.user 
                            
                            ? 
                                <div className="btn-group">
                                    <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.props.user.name}
                                    </button>
                                    <div className="dropdown-menu">
                                    <a className="dropdown-item" href="/history">Fichajes</a>
                                    </div>
                                </div>
                                
                            : 
                            
                            <a className="nav-link" href="/sigin">Sign IN</a>}
                           
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        );
    };

}

function mapStateToProps(state) {
    return {
      user: state.nav.user,
    }
}
export default connect(mapStateToProps)(Nav)