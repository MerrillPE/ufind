import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

const OAUTH_ID = process.env.REACT_APP_OAUTH;

const App = () => (
  <GoogleOAuthProvider clientId={OAUTH_ID} >
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
