import { combineReducers, Reducer } from 'redux';
import {AuthState, authReducer} from './authReducer'
import {ErrorState, errorReducer} from './errorReducer'



interface ApplicationState {
    auth: AuthState;
    errors: ErrorState;
}

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    auth: authReducer,
    errors: errorReducer
});

export default rootReducer;