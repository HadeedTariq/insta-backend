import { Router } from "express";
import upload from "express-fileupload";
import { Post } from "../models/Post.js";
const router = Router();
router.use(upload());
router.post("/create", async (req, res) => {
  const { userImage, userName, description, tags, postImage } = req.body;
  if (!userImage || !userName || !description || !tags || !postImage) {
    return res.status(404).json({ message: "Please fill all the fields" });
  }
  try {
    const createPost = await Post.create({
      userImage,
      userName,
      description,
      postImage,
      tags,
    });
    return res.status(200).json({ message: "Post created successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
});
router.get("/", async (req, res) => {
  const allPosts = await Post.find({});
  return res.status(200).json(allPosts);
});
export { router as postRouter };
