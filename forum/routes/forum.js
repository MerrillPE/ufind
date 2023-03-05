import express from 'express';

import { getPosts, getPost, createPost, deletePost, commentPost } from '../controllers/forum.js';
import auth from '../middleware/auth.js';


const forumRouter = express.Router();

/*
forumRouter.get('/', (req, res) => {
    res.send('THIS WORKS!');
});
*/

forumRouter.get('/', getPosts);
forumRouter.get('/:id', getPost);


forumRouter.post('/', auth, createPost);
forumRouter.delete('/:id', auth, deletePost);
forumRouter.patch('/:id/commentPost', auth, commentPost);

export default forumRouter;