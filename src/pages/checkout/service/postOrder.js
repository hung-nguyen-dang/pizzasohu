import aixos from 'axios';
import { fetch_failure, fetch_request, fetch_success } from '../store/orderSlice';
import { fetch_error } from '../../sign-in/store/userSlice';

export default (order) => {
    return function (dispatch) {
        dispatch(fetch_request());
        aixos.post('', order)
            .then(res => dispatch(fetch_success(res.data)))
                .catch(error => dispatch(fetch_error(error.message)))
    }
}