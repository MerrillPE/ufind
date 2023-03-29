import express from "express";

import { createMessage, getConversations, getMessages } from "../controllers/chat.js";
import auth from '../middleware/auth.js';

const chatRouter = express.Router();

chatRouter.get('/messages', auth, getMessages);
chatRouter.get('/', auth, getConversations);

chatRouter.post('/', auth, createMessage);

export default chatRouter;