import { createSlice } from '@reduxjs/toolkit';

export const getNextIndex = (list) => {
    if (list.length === 0) {
        return 0;
    } else {
        let max = 0;

        list.forEach(item => {
            if (item.index > max) {
                max = item.index;
            }
        });

        return ++max;
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: window.localStorage.cart ? JSON.parse(window.localStorage.cart) : [],
    reducers: {
        addToCart: (state, action) => {
            let product = action.payload, newState;

            if (state.length === 0) {
                newState = [ ...state ]
            } else {
                // check if product already exsists
                for (let i = 0; i < state.length; i++) {
                    if (state[i].id === product.id) {
                        // check if this is not a pizza then just add quantity
                        if (product.category !== "PIZZA") {
                            state[i].quantity++;
                            return;
                        } else {
                            // check if size & option are the similar
                            if (state[i].pricing.selected === product.pricing.selected 
                                && state[i].additionalOption.selected === product.additionalOption.selected) {
                                state[i].quantity++;
                                return;
                            }
                        }
                    }
                }

                newState = [ ...state ]
            }

            return [
                ...newState,
                {
                    index: getNextIndex(state),
                    ...product,
                    quantity: 1,
                }
            ]
        },

        increaseQuantity: (state, action) => {
            let index = action.payload;

            state.forEach( item => {
                if (item.index === index) {
                    item.quantity += 1;
                }
            })
        },

        decreaseQuantity: (state, action) => {
            let index = action.payload;

            state.forEach( item => {
                if (item.index === index) {
                    item.quantity -= 1;
                }
            })
        },

        setQuantity: (state, action) => {
            let { id, quantity } = action.payload;

            state.forEach( item => {
                if (item.id === id) {
                    item.quantity = parseInt(quantity);
                }
            })
        },

        removeFromCart: (state, action) => {
            return state.filter( (value) => {
                return value.index !== action.payload
            })
        },

        save: (state, action) => {
            window.localStorage.cart = JSON.stringify(state);
        },

        reset: () => {
            window.localStorage.removeItem("cart");
            return []
        }
    }
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setQuantity, save, reset } = cartSlice.actions;

export default cartSlice.reducer;