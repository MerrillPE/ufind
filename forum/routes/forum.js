import express from 'express';

const router = express.Router();

// http://localhost:5000/forum
router.get('/', (req, res) => {
    res.send('working!');
});

export default router;