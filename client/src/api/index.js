import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001' });

export const signIn = (formData) => {
    const { username, password } = formData;
    console.log('API form: ' + username);
    API.post('users/signin', formData);
}