import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

const App = () => (
  <BrowserRouter>
    <Container maxWidth='lg'>
      <Routes>
        <Route path='/signin' exact element={<SignIn />} />
        <Route path='/signup' exact element={<SignUp />} />
      </Routes>
    </Container>
  </BrowserRouter>
);

export default App;
