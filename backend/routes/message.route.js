import express from 'express'
import { deleteMessage, getMessages, sendMessage } from '../controllers/message.controller.js';
import protectedRoute from '../middlewares/protectedRoute.js'
const messageRouter = express.Router();

messageRouter.post("/send/:id",protectedRoute,sendMessage);
messageRouter.get("/:id",protectedRoute,getMessages);
messageRouter.delete("/:messageId",protectedRoute,deleteMessage);

export default messageRouter;