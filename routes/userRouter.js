import { Router } from "express";
import { authenticateUser, createUser, deleteUser, getAllUser, getSingleUser, logOutUser, updateUserDetails, updateUserPassword } from "../controllers/userController.js";
import upload from 'express-fileupload'
const router = Router()
router.use(upload())
router.post('/create',createUser)
router.post('/auth',authenticateUser )
router.delete('/delete',deleteUser)
router.put('/update', updateUserPassword)
router.put('/updateUserDetails', updateUserDetails)
router.post('/singleUser', getSingleUser)
router.post('/logout', logOutUser)
router.get('/', getAllUser)

export { router as userRouter }