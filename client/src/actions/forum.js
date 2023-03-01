import * as api from '../api/index';
import { FETCH_POST, FETCH_ALL, CREATE, } from '../constants/actionTypes';

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)

        // Send to reducer
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        // Checking data flow
        //data.map((post) => console.log(post))

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: data })
    } catch (error) {
        console.log(error);
    }
}
