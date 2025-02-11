import { usercontroller } from "../controllers/userController.js";
import express from 'express';
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.get('/getUser/:id', verifyToken, usercontroller.getUser)// as all users have common-type id structure so it doesnot function properly
router.get('/getUsers', verifyToken, usercontroller.getUsers)
router.post('/updateUser/:id', verifyToken, usercontroller.updateUser)
router.delete('/deleteUser/:id', verifyToken, usercontroller.deleteUser)
router.post('/savePost',  verifyToken, usercontroller.savePost)
router.get('/profilePost',  verifyToken,  usercontroller.profilePosts)
router.get('/getNotification', verifyToken,  usercontroller.getNotificationNumber)
export default router;
