import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Home from './components/Home/Home';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import PostForm from './components/Form/Form';
import Post from './components/Posts/Post/Post';
import Navbar from './components/Navbar/Navbar';

const OAUTH_ID = process.env.REACT_APP_OAUTH;

const App = () => {
  //const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <GoogleOAuthProvider clientId={OAUTH_ID} >
      <BrowserRouter>
        <Container maxWidth='lg'>
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/search' exact element={<Home />} />
            <Route path='/post/:id' exact element={<Post />} />
            <Route path='/signin' exact element={<SignIn />} />
            <Route path='/signup' exact element={<SignUp />} />
            <Route path='/createPost' exact element={<PostForm />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );

}

export default App;
