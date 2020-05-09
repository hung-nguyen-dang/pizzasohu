import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        loading: false,
        userInfo: undefined,
        code: undefined
    },
    reducers: {
        fetch_request: (state, action) => {
            return {
                ...state, loading: true
            }
        },

        fetch_success: (state, action) => {
            return {
                ...state,
                loading: false,
                code: action.payload
            }
        },

        fetch_failure: (state, action) => {
            return {
                ...state,
                loading: false,
                code: action.payload
            }
        },

        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        }
    }
})

export const { fetch_failure, fetch_request, fetch_success, setUserInfo } = orderSlice.actions

export default orderSlice.reducer;