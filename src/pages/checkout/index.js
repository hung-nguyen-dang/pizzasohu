import React from 'react';
import Header from '../../components/header';
import Payment from './payment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPreviousPage } from '../../feature/previousPage/previousPageSlice';
import { setMessage } from '../../feature/message/messageSlice';
import { Redirect } from 'react-router-dom';
import { reset } from '../cart/store/cartSlice';
import CartSumary from './cartSumary';
import Popup from './popup/index';
import postOrder from './service/postOrder';
import Loading from '../../components/loading-effect';
import './payment.sass';

class Checkout extends React.Component {

    submit = () => {
        this.props.dispatch(reset());
        window.location.replace('/');
        this.props.dispatch(setMessage("Order submitted successful. Thank you!!"));
    }

    render() {
        let { cart, user, order, dispatch } = this.props;

        if (user.code !== 200) {
            dispatch(setPreviousPage('/checkout'));
            dispatch(setMessage("Please sign in with your account first"));
            return (
                <Redirect push to='/sign-in' />
            )
        }

        if (order.loading) {
            return (
                <div>
                    <Header />
                    <Loading />
                </div>
            )
        } else {
            switch(order.code) {
                case 200:
                    if (order.userID === user.id) {
                        dispatch(setMessage("Order submitted successful. Thank you!!"));
                        dispatch(reset());
                        return (
                            <Redirect push to='/'/>
                        )
                    }
                    break;
                default:
                    return (
                        <div>
                            <Header  />
                            <Popup submit={this.submit} />
                            <div className="payment-container">
                                <Payment user={user.data} />
                                <CartSumary cart={cart} />
                            </div>
                        </div>
                    )
            }
        }
    }
    
}

Checkout.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.object
}

const mapState = state => {
    return {
        cart: state.cart,
        user: state.user,
        order: state.order
    }
}

export default connect(mapState)(Checkout);