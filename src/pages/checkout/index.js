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
import { setUserInfo, resetOrder } from './store/orderSlice';
import './payment.sass';

class Checkout extends React.Component {

    submit = () => {
        this.props.dispatch(postOrder({
            userInfo: {
                ...this.props.order.userInfo
            },
            cartInfo: this.props.cart
        }))
    }

    paymentInfo = (info) => {
        this.props.dispatch(setUserInfo(info));
    }

    componentDidUpdate() {
        if (this.props.order.code !== undefined) {
            this.props.dispatch(resetOrder());
        }
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
                case 201:
                    dispatch(setMessage("Order submitted successful. Thank you!!"));
                    dispatch(reset());
                    dispatch(resetOrder());
                    
                    return (
                        <Redirect push to='/'/>
                    )
                case 500:
                    dispatch(setMessage("Your order is not submitted, please try again."));

                    return (
                        <div>
                            <Header  />
                            <Popup submit={this.submit} />
                            <div className="payment-container">
                                <Payment paymentInfo={this.paymentInfo} user={user.data} />
                                <CartSumary cart={cart} />
                            </div>
                        </div>
                    )
                case 401:
                    dispatch(setMessage("Invalid credit card."));

                    return (
                        <div>
                            <Header  />
                            <Popup submit={this.submit} />
                            <div className="payment-container">
                                <Payment paymentInfo={this.paymentInfo} user={user.data} />
                                <CartSumary cart={cart} />
                            </div>
                        </div>
                    )
                default:
                    return (
                        <div>
                            <Header  />
                            <Popup submit={this.submit} />
                            <div className="payment-container">
                                <Payment paymentInfo={this.paymentInfo} user={user.data} />
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