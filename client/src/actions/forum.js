import * as api from '../api/index';
import { FETCH_POST, FETCH_ALL, CREATE, DELETE, COMMENT, FETCH_LOCAL } from '../constants/actionTypes';

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

export const getLocalPosts = (coordinatesStr) => async (dispatch) => {
    try {
        const coordinates = JSON.parse(coordinatesStr);
        const { data } = await api.fetchLocalPosts(coordinates);

        dispatch({ type: FETCH_LOCAL, payload: data })
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

export const getMyPosts = (id) => async (dispatch) => {
    try {
        const {data} = await api.fetchMyPosts(id);

        dispatch ({type: FETCH_MY_POSTS, payload: data})
    } catch (error) {
        console.log(error);
    }
}
/*
export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await Post.findById(id);
    post.comments.push(value);

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}
*/

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
