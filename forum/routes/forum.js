import express from 'express';

import { getPosts, getPost, createPost, deletePost } from '../controllers/forum.js';


const forumRouter = express.Router();

/*
forumRouter.get('/', (req, res) => {
    res.send('THIS WORKS!');
});
*/

forumRouter.get('/', getPosts);
forumRouter.get('/:id', getPost);

// TODO: add auth requirement
forumRouter.post('/', createPost);
forumRouter.delete('/:id', deletePost);

export default forumRouter;


