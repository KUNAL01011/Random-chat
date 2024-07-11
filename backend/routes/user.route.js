import express from 'express'
import protectedRoute from '../middlewares/protectedRoute.js';
import { getUsersForSidebar } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/',protectedRoute,getUsersForSidebar);
export default userRouter;