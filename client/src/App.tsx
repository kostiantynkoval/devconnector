import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { SET_USER } from './store/actionTypes'


import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Dashboard from './components/layout/Dashboard';
import PrivateRoute from './components/auth/PrivateRoute'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

import './App.css';


class App extends Component {
    constructor(props: any) {
        super(props);
        // Check for token
        const token = localStorage.getItem('token') || '';
        if(token.length > 0) {
            setAuthToken(token);
            store.dispatch({type: SET_USER, payload: jwt_decode(token)})
        } else {
            setAuthToken(false);
        }
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Switch>
                            <PrivateRoute exact path="/" component={Landing}/>
                            <PrivateRoute path="/dashboard" component={Dashboard}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                        </Switch>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
