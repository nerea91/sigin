import React from "react"

class Hour extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);

        const {
            entry_in = '',
            entry_out = '',
            day_id = '',
            id = '',
            diff = ''
        } = props;

        this.state = props;
        
    }
    componentDidMount(){
  
    }

    handleChange(type, event) {
        //event.preventDefault();
        console.log(type, event.target.value, this.state);
        let url = this.state.id ? "api/hour/"+this.state.id : "api/hour";
        let data = {
            entry_in: (type == 'in') ? event.target.value : this.state.entry_in,
            entry_out: (type == 'out') ? event.target.value : this.state.entry_out,
            day_id: this.state.day_id,
            id: this.state.id,
        };

        axios.post(url, data)
        .then((response) => {
            this.setState(response.data.input);
            console.log('despues', this.state);
            
        })
        .catch((error) => {
            console.log('error', error);
            //dispatch({type: "FETCH_USERS_REJECTED", payload: error});
        })
  
        
        //this.props.dispatch(updateHour($value, $type));

    }


    render() {
        return (
            <div className="hour mb-05em">
                <div className="hour">
                    <input type="text" defaultValue={this.state.entry_in} id={'entry-in-'+this.state.id} onBlur={(event) => this.handleChange('in', event)}/>
                    <input type="text" defaultValue={this.state.entry_out} id={'entry-out-'+this.state.id} onBlur={(event) => this.handleChange('out', event)}/>
                </div>
                <span>{this.state.diff}</span>
            </div>
        );
    }
    
}

export default Hour