import express from 'express'
import protectedRoute from '../middlewares/protectedRoute.js';
import { getUsersForSidebar, updateUserProfile } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.get('/',protectedRoute,getUsersForSidebar);
userRouter.put('/update-profile',protectedRoute,upload.single("profilePic"),updateUserProfile);
export default userRouter;