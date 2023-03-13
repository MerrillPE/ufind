import axios from 'axios';

const authAPI = axios.create({ baseURL: 'http://localhost:5001' });
const forumAPI = axios.create({ baseURL: 'http://localhost:5002' });

forumAPI.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const signIn = (formData) => authAPI.post('users/signin', formData);
export const signUp = (formData) => authAPI.post('users/signup', formData);

export const createPost = (formData) => forumAPI.post('forum/', formData);
export const fetchPosts = () => forumAPI.get('forum/');
export const fetchLocalPosts = (coordinates) => forumAPI.get(`forum/locale?lng=${coordinates.lng}&lat=${coordinates.lat}`);
export const fetchPost = (id) => forumAPI.get(`forum/post/${id}`);
export const deletePost = (id) => forumAPI.delete(`forum/post/${id}`);
export const comment = (value, id) => forumAPI.patch(`/forum/post/${id}/commentPost`, { value });