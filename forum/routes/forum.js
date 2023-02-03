import express from 'express';

const router = express.Router();

// http://localhost:5000/forum
router.get('/', (req, res) => {
    res.send('THIS WORKS!');
});

export default router;