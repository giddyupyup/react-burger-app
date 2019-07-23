import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../redux/actions';
import Axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount () {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }

  render () {
    let renderThis = <Spinner />

    if (!this.props.loading) {
      renderThis = (
        <div>
          {
            this.props.orders.map((order) => (
              <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
            ))
          }
        </div>
      );
    }

    return renderThis;
  }
}

function MapStateToProps (state) {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
}

const mapDispatchToProps = { fetchOrders };

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Orders, Axios));
