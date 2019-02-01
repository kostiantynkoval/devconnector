import { Reducer } from 'redux'
import {REGISTER, REGISTER_FAIL} from '../actionTypes'

export interface ErrorState {
    name: string;
    email: string;
    password: string;
    password2: string;
}

// Type-safe initialState!
const initialState: ErrorState = {
    name: '',
    email: '',
    password: '',
    password2: '',
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const errorReducer: Reducer<any> = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER: {
            return { ...initialState }
        }
        case REGISTER_FAIL: {
            return { ...state, ...action.payload }
        }
        default: {
            return state
        }
    }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { errorReducer }