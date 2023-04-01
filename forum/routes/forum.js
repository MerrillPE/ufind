import express from 'express';

import { getUserPosts, getPosts, getPost, createPost, deletePost, commentPost, getLocalPosts, savePost, getSavedPosts, getPostsByCategory, getLocalPostsByCategory, } from '../controllers/forum.js';
import auth from '../middleware/auth.js';


const forumRouter = express.Router();

forumRouter.get('/', getPosts);
forumRouter.get('/post/:id', getPost);
forumRouter.get('/post/user/:userID', getUserPosts);
forumRouter.get('/locale', getLocalPosts);
forumRouter.get('/posts', getPostsByCategory);
forumRouter.get('/posts/locale', getLocalPostsByCategory);

//forumRouter.patch('/post/setCat', setCategory);

// routes that require authentication
forumRouter.post('/', auth, createPost);
forumRouter.delete('/post/:id', auth, deletePost);
forumRouter.patch('/post/:id/commentPost', auth, commentPost);
forumRouter.patch('/post/:id/savePost', auth, savePost);
forumRouter.get('/post/savedPosts/:userID', auth, getSavedPosts);

export default forumRouter;


