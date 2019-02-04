import { Reducer } from 'redux';
import {
    REGISTER, REGISTER_SUCCESS, REGISTER_FAIL,
    LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT,
    SET_USER
} from '../actionTypes';
import isEmpty from '../../utils/isEmpty';

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
        case LOGIN:
            return {
                ...state,
                loading: true
            };
        case REGISTER_SUCCESS:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            return {
                ...state,
                user: {},
                isAuthenticated: false,
                loading: false
            };
        case LOGIN_SUCCESS:
        case SET_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                loading: false
            };
        default: {
            return state
        }
    }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { authReducer }