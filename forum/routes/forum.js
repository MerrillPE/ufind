import express from 'express';

import { getPosts, getPost, createPost, deletePost, commentPost, getLocalPosts } from '../controllers/forum.js';
import auth from '../middleware/auth.js';


const forumRouter = express.Router();

forumRouter.get('/', getPosts);
forumRouter.get('/post/:id', getPost);
forumRouter.get('/locale', getLocalPosts);

// routes that require authentication
forumRouter.post('/', auth, createPost);
forumRouter.delete('/post/:id', auth, deletePost);
forumRouter.patch('/post/:id/commentPost', auth, commentPost);

export default forumRouter;