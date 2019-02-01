import axios from 'axios';

const setAuthtoken = (token: string) => {
    if(token) {
        // Apply token to every request
        axios.defaults.headers.common['Authorization'] = token
    } else {
        // Delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthtoken;