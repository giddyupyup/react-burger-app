import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInitIngredients, addIngredients, removeIngredients, setAuthRedirect } from '../../redux/actions';
import Aux from '../../hoc/Aux/Aux';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Axios from '../../axios-orders';

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount () {
    if(!this.props.building) this.props.getInitIngredients();
  }

  updatePurchaseState(updateIngredients) {
    const ingredients = { ...updateIngredients };
    const sum = Object.keys(ingredients)
                .map(key => {
                  return ingredients[key]
                })
                .reduce((a, b) => a+b ,0)

    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.setAuthRedirect('/')
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };

    for (const key in disabledInfo) {
      if (disabledInfo.hasOwnProperty(key)) {
        disabledInfo[key] = disabledInfo[key] <= 0;

      }
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BurgerControls
            isAuth={this.props.isAuthenticated}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler}
            ingredientAdded={this.props.addIngredients}
            ingredientRemoved={this.props.removeIngredients} />
        </Aux>
      );

      orderSummary = <OrderSummary
                        ingredients={this.props.ingredients}
                        price={this.props.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

function MapStateToProps (state) {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
    isAuthenticated: state.auth.authenticated,
    building: state.burger.building
  }
}

const mapDispatchToProps = { getInitIngredients, addIngredients, removeIngredients, setAuthRedirect };

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, Axios));
