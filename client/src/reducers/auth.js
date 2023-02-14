import { AUTH } from '../constants/actionTypes';
import jwt_decode from 'jwt-decode';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            console.log(action?.data.token)
            const token = action?.data.token;
            const decoded = jwt_decode(token);
            console.log(decoded);
            localStorage.setItem('profile', JSON.stringify({ ...decoded, token }));
            return { ...state, authData: decoded };
        default:
            return state;
    }
}

export default authReducer;
