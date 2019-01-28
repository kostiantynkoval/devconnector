import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import rootReducer from './reducers';

declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}

const sagaMiddleware = createSagaMiddleware();

// TODO: define right type
let store: any;
if(process.env.NODE_ENV === 'development') {
    console.log(rootReducer)
    store = createStore(
        rootReducer,
        compose(
            applyMiddleware(sagaMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f:any) => f
        )
    );
} else {
    store = createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware)
    );
}

sagaMiddleware.run(rootSaga)



export default store