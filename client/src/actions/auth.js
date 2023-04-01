import * as api from '../api/index';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData) => async (dispatch) => {
    try {

        const response = await api.signIn(formData);
        //console.log("response: ");
        //console.log(response);
        const { data, status } = response;

        // Send to reducer
        dispatch({ type: AUTH, data });

        return status;
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData) => async (dispatch) => {

    try {
        const response = await api.signUp(formData);
        //console.log("response: ");
        //console.log(response);
        const { data } = response;

        dispatch({ type: AUTH, data });
        return response;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return error.response;
        }
    }
};