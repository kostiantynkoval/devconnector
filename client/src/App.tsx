import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { SET_USER } from './store/actionTypes'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
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
        console.log(store);
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
