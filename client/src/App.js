import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './style.css';


import Home from './components/Home/Home';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import PostForm from './components/Form/Form';
import Post from './components/Posts/Post/Post';
import Navbar from './components/Navbar/Navbar';
import Conversations from './components/Chat/Conversations';
import Chat from './components/Chat/Chat';
import SavedPosts from './components/Posts/User/SavedPosts.js';
import MyPosts from './components/Profile/MyPosts';

const OAUTH_ID = process.env.REACT_APP_OAUTH;
document.body.style.backgroundColor = "#fff2e0";

const App = () => {
  //const user = JSON.parse(localStorage.getItem('profile'));


  return (
    <GoogleOAuthProvider clientId={OAUTH_ID} >
      <BrowserRouter>
        <Container maxWidth='lg' >
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Navigate to='/posts' />} />
            <Route path='/posts' exact element={<Home />} />
            <Route path='/search' exact element={<Home />} />
            <Route path='/post/:id' exact element={<Post />} />
            <Route path='/signin' exact element={<SignIn />} />
            <Route path='/signup' exact element={<SignUp />} />

            <Route path='/createPost' exact element={<PostForm />} />
            <Route path='/chat' exact element={<Conversations />} />
            <Route path='/chat/:id/:name' exact element={<Chat />} />
            <Route path='/savedPosts/' exact element={<SavedPosts />} />
            <Route path='/myPosts' exact element={<MyPosts />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );

}

export default App;

/*
import react from 'react';
const App = () => {
    return (
        <div>
            <h1>App</h1>
        </div>
    );
}
*/