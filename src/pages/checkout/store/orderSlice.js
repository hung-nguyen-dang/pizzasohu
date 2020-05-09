import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        loading: false,
        userID: undefined,
        code: undefined
    },
    reducers: {
        fetch_request: (state, action) => {
            return {
                ...state, loading: true
            }
        },

        fetch_success: (state, action) => {
            let { data, code } = action.payload;

            return {
                ...state,
                loading: false,
                userID: action.payload,
                code: 200
            }
        },

        fetch_failure: (state, action) => {
            return {
                ...state,
                loading: false,
                code: action.payload.error
            }
        },
    }
})

export const { fetch_failure, fetch_request, fetch_success } = orderSlice.actions

export default orderSlice.reducer;