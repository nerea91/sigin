import React from "react"

class Hour extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);

        const {
            entry_in = '',
            entry_out = '',
            day_id = '',
            id = ''
        } = props;

        
    }
    componentDidMount(){
  
    }

    handleChange(type, event) {
        //event.preventDefault();
        console.log(type, event.target.value);
        
        //this.props.dispatch(updateHour($value, $type));

    }

    render() {
        return (
            <div>
                <input type="text" defaultValue={this.props.entry_in} id={'entry-in-'+this.props.id} onBlur={(event) => this.handleChange('in', event)}/>
                <input type="text" defaultValue={this.props.entry_out} id={'entry-out-'+this.props.id} onBlur={(event) => this.handleChange('out', event)}/>
            </div>
        );
    }
    
}

export default Hour