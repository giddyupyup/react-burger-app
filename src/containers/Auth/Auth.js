import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate, setAuthRedirect } from '../../redux/actions';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../utils/utils';
import CSSClass from './Auth.module.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  componentDidMount () {
    if (!this.props.building) this.props.setAuthRedirect('/')
  }

  inputChangeHandler = (event, name) => {
    const updateControls = {
      ...this.state.controls,
      [name]: {
        ...this.state.controls[name],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[name].validation
        ),
        touched: true
      }
    };

    this.setState({
      controls: updateControls
    });

  };

  authenticationHandler = (event) => {
    event.preventDefault();
    this.props.authenticate(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  };

  render () {
    const formElements = [];
    for (const key in this.state.controls) {
      if (this.state.controls.hasOwnProperty(key)) {
        const config = this.state.controls[key];
        formElements.push({
          id: key,
          config: config
        });

      }
    }

    let forms = formElements.map(form => (
      <Input
        key={form.id}
        elementType={form.config.elementType}
        elementConfig={form.config.elementConfig}
        value={form.config.value}
        invalid={!form.config.valid}
        shouldValidate={form.config.validation}
        touched={form.config.touched}
        changed={(e) => this.inputChangeHandler(e, form.id)} />
    ));

    if (this.props.loading) {
      forms = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;

    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={CSSClass.Auth}>
        { authRedirect }
        { errorMessage }
        <form onSubmit={this.authenticationHandler}>
          { forms }
          <Button btnType='Success' >Submit</Button>
        </form>
        <Button
          btnType='Danger'
          clicked={this.switchAuthModeHandler}>Switch to {!this.state.isSignup ? 'Signup' : 'Signin'}</Button>
      </div>
    );
  }
}

function MapStateToProps (state) {
  return {
    token: state.auth.token,
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.authenticated,
    authRedirectPath: state.auth.authRedirectPath,
    building: state.burger.building
  };
}

const mapDispatchToProps = { authenticate, setAuthRedirect };

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(Auth);
