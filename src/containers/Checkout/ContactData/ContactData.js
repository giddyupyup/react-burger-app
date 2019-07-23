import React, { Component } from 'react';
import { connect } from 'react-redux';
import { purshaseBurgerHandler } from '../../../redux/actions';
import Axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import { checkValidity } from '../../../utils/utils';
import CSSClass from './ContactData.module.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your EMail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastests'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value,
                                                  updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;

    for (const key in updatedOrderForm) {
      if (updatedOrderForm.hasOwnProperty(key)) {
        const valid = updatedOrderForm[key].valid;
        formIsValid = valid && formIsValid;
      }
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    });
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({loading: true});
    const formData = {};
    for (const key in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(key)) {
        const value = this.state.orderForm[key].value;
        formData[key] = value;
      }
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2),
      orderData: {...formData},
      userId: this.props.userId
    }

    this.props.purshaseBurgerHandler(order, this.props.token);
  };

  render () {
    const formElementsArray = [];

    for (const key in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(key)) {
        const elementCfg = this.state.orderForm[key];
        formElementsArray.push({
          id: key,
          config: elementCfg
        });
      }
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {
          formElementsArray.map(el => {
            return <Input
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              invalid={!el.config.valid}
              shouldValidate={el.config.validation}
              touched={el.config.touched}
              changed={(e) => this.inputChangedHandler(e, el.id)} />
          })
        }
        <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={CSSClass.ContactData}>
        <h4>Enter your Contact Data</h4>
        { form }
      </div>
    );
  }
}

function MapStateToProps (state) {
  return {
    ingredients: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = { purshaseBurgerHandler };

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(ContactData, Axios));
