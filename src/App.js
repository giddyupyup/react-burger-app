import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheckState } from './redux/actions';
import Layout from './hoc/Layout/Layout';
import BurgerBuidler from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';

const asyncCheckout = AsyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const asyncOrders = AsyncComponent(() => {
  return import('./containers/Orders/Orders')
})

const asyncAuth = AsyncComponent(() => {
  return import('./containers/Auth/Auth')
})

class App extends Component {
  componentDidMount () {
    this.props.authCheckState();
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact component={BurgerBuidler} />
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuidler} />
          <Redirect to='/' />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          { routes }
        </Layout>
      </div>
    );
  }
}

function MapStateToProps (state) {
  return {
    isAuthenticated: state.auth.authenticated
  };
}

const mapDispatchToProps = { authCheckState };

export default withRouter(connect(
  MapStateToProps,
  mapDispatchToProps
)(App));
