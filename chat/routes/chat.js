import express from "express";

import { createMessage, getMessages } from "../controllers/chat.js";

const chatRouter = express.Router();

chatRouter.get('/', getMessages);

chatRouter.post('/', createMessage);

export default chatRouter;