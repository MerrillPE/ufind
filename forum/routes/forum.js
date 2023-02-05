import express from 'express';

const forumRouter = express.Router();

// http://localhost:5000/forum
forumRouter.get('/', (req, res) => {
    res.send('THIS WORKS!');
});

export default forumRouter;