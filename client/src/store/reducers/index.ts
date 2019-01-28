
import { combineReducers, Reducer } from 'redux';
import {TestState, testReducer} from './test'



interface ApplicationState {
    test: TestState;
    // layout: LayoutState
}

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    // router: routerReducer,
    test: testReducer,
    // layout: layoutReducer,
});

console.log(testReducer)

export default rootReducer;