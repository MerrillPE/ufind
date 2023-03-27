import axios from 'axios';

const authAPI = axios.create({ baseURL: 'http://localhost:5001' });
const forumAPI = axios.create({ baseURL: 'http://localhost:5002' });
const chatAPI = axios.create({ baseURL: 'http://localhost:5003' })

// Create header for auth middleware in forum backend
forumAPI.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

// Auth requests
export const signIn = (formData) => authAPI.post('users/signin', formData);
export const signUp = (formData) => authAPI.post('users/signup', formData);

// Forum requests
export const createPost = (formData) => forumAPI.post('forum/', formData);
export const fetchPosts = (start, limit) => forumAPI.get(`forum?start=${start}&limit=${limit}`);
export const fetchLocalPosts = (coordinates, start, limit) => forumAPI.get(`forum/locale?lng=${coordinates.lng}&lat=${coordinates.lat}&start=${start}&limit=${limit}`);
export const fetchPost = (id) => forumAPI.get(`forum/post/${id}`);
export const deletePost = (id) => forumAPI.delete(`forum/post/${id}`);
export const comment = (value, id) => forumAPI.patch(`/forum/post/${id}/commentPost`, { value });

// Chat requests
export const fetchChats = (userID) => chatAPI.get(`/chat?user=${userID}`);
export const fetchChat = (userID, partnerID) => chatAPI.get(`/chat/messages?user1=${userID}&user2=${partnerID}`);
export const sendMessage = (message) => chatAPI.post('/chat', message);