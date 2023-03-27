import express from "express";

import { createMessage, getConversations, getMessages } from "../controllers/chat.js";

const chatRouter = express.Router();

chatRouter.get('/messages', getMessages);
chatRouter.get('/', getConversations);

chatRouter.post('/', createMessage);

export default chatRouter;