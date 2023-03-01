import * as api from '../api/index';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData) => async (dispatch) => {
    try {

        const { data } = await api.signIn(formData);

        // Send to reducer
        dispatch({ type: AUTH, data });
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData) => async (dispatch) => {

    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });

    } catch (error) {
        console.log(error);
    }
};