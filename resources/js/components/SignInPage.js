import {
    reduxForm,
    Field
} from 'redux-form';

import React from 'react';
import { connect } from "react-redux";
import { Redirect, withRouter } from 'react-router-dom'
import { FETCH_USER_LOGGED } from "../constants/action-types";

const FormField = ({
    label,
    input,
    type,
    name,
    className,
    meta: { touched, error, warning }
}) => (
<div className="form-group">
    {
        label &&
        <label htmlFor={name}>{label}</label>
    }
    <input {...input } name={name} type={type} className={
        `${className} ${
            touched && (
                (error && 'is-invalid')
            )
        }`
    } />
    {
        touched &&
            (error && <span className="invalid-feedback">{error}</span>)
    }
</div>
);

/*const validatorSignInForm = (values) => {
    const result = validate(values, {
        email: {
            presence: {
                message: '^Please enter your email address.'
            },
            email: {
                message: '^Please enter a valid email address.'
            }
        },
        password: {
            presence: {
                message: '^Please enter your password.'
            }
        }
    });

    return result;
};*/

class SignInPage extends React.Component {
    

    constructor(props) {
        super(props);

        this.processSubmit = this.processSubmit.bind(this);
    }

    componentDidMount() {
        // do something like setting default state
    }

    processSubmit(values) {
        axios.post("api/login", values)
        .then((response) => {
            this.props.dispatch({type: FETCH_USER_LOGGED, payload: response.data});
        })
        .catch((error) => {
            console.log('error', error);
            //dispatch({type: "FETCH_USERS_REJECTED", payload: error});
        })
    }

    render() {
        const { handleSubmit, submitting } = this.props;

        if (this.props.user) {
            return (<Redirect to='/'/>);
          }

        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                            <h2 className="text-center font-weight-light mb-4">Sign into your account</h2>
                                <form onSubmit={handleSubmit(this.processSubmit)}>
                                    <Field
                                        label="Email Address"
                                        name="email"
                                        component={FormField}
                                        id="email"
                                        type="text"
                                        className="form-control"
                                    />
                                    <Field label="Password" name="password" component={FormField} id="password" type="password" className="form-control" />
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <Field name="remember" component="input" type="checkbox" className="form-check-input mt-2" value="1" />
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="form-group mt-4">
                                        <button type="submit" className="btn btn-secondary" disabled={submitting}>Continue</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

SignInPage = reduxForm({
    form: 'signin',
    //validate: null//validatorSignInForm,
})(SignInPage);

function mapStateToProps(state) {
    return {
      user: state.nav.user,
    }
}
export default connect(mapStateToProps)(withRouter(SignInPage))