import aixos from 'axios';
import { fetch_failure, fetch_request, fetch_success } from '../store/orderSlice';

export default (order) => {

    return function (dispatch) {

        dispatch(fetch_request());
        aixos.post('https://sohu-pizza-backend.herokuapp.com/pizza/orders', order)
            .then(res => dispatch(fetch_success(res.data.code)))
                .catch(error => dispatch(fetch_failure(error.response.data.code)))
    }
}