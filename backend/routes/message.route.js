import express from 'express'
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import protectedRoute from '../middlewares/protectedRoute.js'
const messageRouter = express.Router();

messageRouter.post("/send/:id",protectedRoute,sendMessage);
messageRouter.get("/get/:id",protectedRoute,getMessages);

export default messageRouter;