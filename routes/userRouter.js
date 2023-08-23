import { Router } from "express";
import {
  authenticateUser,
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  logOutUser,
  updateUserDetails,
  updateUserPassword,
} from "../controllers/userController.js";
const router = Router();
router.post("/create", createUser);
router.post("/auth", authenticateUser);
router.post("/delete", deleteUser);
router.put("/update", updateUserPassword);
router.put("/updateUserDetails", updateUserDetails);
router.post("/singleUser", getSingleUser);
router.post("/logout", logOutUser);
router.get("/", getAllUser);

export { router as userRouter };
