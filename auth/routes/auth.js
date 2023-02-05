import express from 'express';

import { signIn, signUp } from '../controllers/auth.js';

const authRouter = express.Router();

// Create api routes for controller functions
authRouter.post('/signin', signIn);
authRouter.post('/signup', signUp);

export default authRouter;