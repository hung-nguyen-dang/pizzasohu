import axios from 'axios';
import { fetch_failure, fetch_request, fetch_success } from '../store/detailSlice';

export default (id) => {
    return function(dispatch) {
        dispatch(fetch_request());
        axios.get(`https://sohu-pizza-product-service.herokuapp.com/pizza/products/${id}`)
            .then(res => dispatch(fetch_success(res.data)))
                .catch(error => dispatch(fetch_failure(error.message)))
    }
}