import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { purchaseInit } from '../../redux/actions';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render () {
    let summary = <Redirect to='/' />;

    if (this.props.ingredients && !this.props.purchased) {
      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData} />
        </div>
      );
    }

    return summary;
  }
}

function MapStateToProps (state) {
  return {
    ingredients: state.burger.ingredients,
    purchased: state.order.purchased
  };
}

const mapDispatchToProps = { purchaseInit };

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(Checkout);
