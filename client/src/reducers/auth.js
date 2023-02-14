import { AUTH } from '../constants/actionTypes';
import jwt_decode from 'jwt-decode';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            console.log(action?.data.token)
            const token = action?.data.token;
            const decoded = jwt_decode(token);
            localStorage.setItem('profile', JSON.stringify({ ...decoded, token }));
            //const { name, email, sub, picture } = decoded;
            //console.log(decoded);
            return { ...state, authData: decoded };
        default:
            return state;
    }
}

export default authReducer;
