import axios from 'axios';
import { fetch_success, fetch_request, fetch_failure, category } from '../store/productSlice';

export default (cat, page, size) => {
    let api;

    if (cat === category.all) {
        api = `https://sohu-pizza-product-service.herokuapp.com/pizza/productcards?size=${size}&page=${page}`;
    } else {
        api = `https://sohu-pizza-product-service.herokuapp.com/pizza/productcards?category=${cat}&size=${size}&page=${page}`;
    }

    return function(dispatch) {
        dispatch(fetch_request())
        axios.get(api)
            .then(res => dispatch(fetch_success(res.data)))
                .catch(error => dispatch(fetch_failure(error.response)))
    }
}