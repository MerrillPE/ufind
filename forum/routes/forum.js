import express from 'express';

import { getPosts, getPost, createPost, deletePost } from '../controllers/forum.js';
import auth from '../middleware/auth.js';


const forumRouter = express.Router();

/*
forumRouter.get('/', (req, res) => {
    res.send('THIS WORKS!');
});
*/

forumRouter.get('/', getPosts);
forumRouter.get('/:id', getPost);

// TODO: add auth requirement
forumRouter.post('/', auth, createPost);
forumRouter.delete('/:id', auth, deletePost);

export default forumRouter;