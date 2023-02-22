import axios from 'axios';

const authAPI = axios.create({ baseURL: 'http://localhost:5001' });
const forumAPI = axios.create({ baseURL: 'http://localhost:5002' });

export const signIn = (formData) => authAPI.post('users/signin', formData);
export const signUp = (formData) => authAPI.post('users/signup', formData);

export const createPost = (formData) => forumAPI.post('forum/', formData);
