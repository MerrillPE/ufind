import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

//const OAUTH_ID = process.env.REACT_APP_OAUTH;

const App = () => (
  <GoogleOAuthProvider clientId='1040116133990-4mfe5j4sl187kltqlvctjcug6h6p8act.apps.googleusercontent.com' >
    <BrowserRouter>
      <Container maxWidth='lg'>
        <Routes>
          <Route path='/signin' exact element={<SignIn />} />
          <Route path='/signup' exact element={<SignUp />} />
        </Routes>
      </Container>
    </BrowserRouter>
  </GoogleOAuthProvider>
);

export default App;
