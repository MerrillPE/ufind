import * as api from '../api/index';
import { FETCH_POST, FETCH_ALL, CREATE, DELETE, COMMENT, FETCH_LOCAL, START_LOADING, END_LOADING } from '../constants/actionTypes';

export const createPost = (post) => async (dispatch) => {
    try {
        // Make api request
        const { data } = await api.createPost(post)

        // Send to reducer
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const getPosts = (start, limit) => async (dispatch) => {
    try {
        if (start === 0) {
            dispatch({ type: START_LOADING })
        }
        const { data } = await api.fetchPosts(start, limit);

        dispatch({ type: FETCH_ALL, payload: data });

        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const getLocalPosts = (coordinatesStr, start, limit) => async (dispatch) => {
    try {
        if (start === 0) {
            dispatch({ type: START_LOADING })
        }
        const coordinates = JSON.parse(coordinatesStr);
        const { data } = await api.fetchLocalPosts(coordinates, start, limit);

        dispatch({ type: FETCH_LOCAL, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (comment, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(comment, id);

        dispatch({ type: COMMENT, payload: data });
        return (data.comments);
    } catch (error) {
        console.log(error);
    }
}