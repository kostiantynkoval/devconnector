import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken'
import {
    REGISTER, REGISTER_SUCCESS, REGISTER_FAIL,
    LOGIN, LOGIN_SUCCESS, LOGIN_FAIL
} from '../actionTypes';
import { RegistrationData } from '../../components/auth/Register';

interface RegistrationPayload {
    data: RegistrationData;
    history: any
}


// Registration Saga
export function* initRegistration(action: {type: string, payload: RegistrationPayload}):any {
    try {
        const res = yield call<any>(registerUser, action.payload.data)
        yield put({ type: REGISTER_SUCCESS, payload: res.data })
        return call(action.payload.history.push, '/login')
    } catch (e) {
        yield put({ type: REGISTER_FAIL, payload: e.response ? e.response.data : null })
    }

}
// Register query
function registerUser(data: any) {
    return axios.post(`${process.env.REACT_APP_URL_USERS}/register`, data)

}


// Login Saga
export function* initLogin(action: {type: string, payload: RegistrationPayload}):any {
    try {
        const res = yield call<any>(loginUser, action.payload.data)
        const { token } = res.data;
        //localStorage.setItem('token', res.data.token);
        // Set Authorization header in axios
        setAuthToken(token);
        // Decode JWT Token
        const decodedUser = jwt_decode(token);
        // Dispatch decoded user data
        yield put({ type: LOGIN_SUCCESS, payload: decodedUser })
        return call(action.payload.history.push, '/')
    } catch (e) {
        yield put({ type: LOGIN_FAIL, payload: e.response ? e.response.data : null })
    }

}
// Register query
function loginUser(data: any) {
    return axios.post(`${process.env.REACT_APP_URL_USERS}/register`, data)

}


// Watcher Saga
export function* watchAuth() {
    yield takeLatest(REGISTER, initRegistration),
    yield takeLatest(LOGIN, initLogin)
}