import * as api from '../api/index';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData) => async (dispatch) => {
    try {

        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
    } catch (error) {
        console.log(error);
    }
};