import { Reducer } from 'redux'
import {REGISTER, REGISTER_SUCCESS, REGISTER_FAIL} from '../actionTypes'

export interface AuthState {
    user: any,
    isAuthenticated: boolean,
    loading: boolean
}

// Type-safe initialState!
const initialState: AuthState = {
    user: {},
    isAuthenticated: false,
    loading: false
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const authReducer: Reducer<any> = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER:
            return { ...state, loading: true }
        case REGISTER_SUCCESS:
            return { ...state, user: action.payload, isAuthenticated: true, loading: false }
        case REGISTER_FAIL:
            return { ...state, user: {}, isAuthenticated: false, loading: false }
        default: {
            return state
        }
    }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { authReducer }