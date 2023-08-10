import { Router } from "express";
import upload from 'express-fileupload'
import { Post } from "../models/Post.js";
const router = Router()
router.use(upload())
router.post('/create', async (req, res) => {
    const { userImage, userName, description, tags } = req.body;
    const fileObject=req.files
    if (!userImage || !userName || !description || !tags || !fileObject){
        return res.status(404).json({message:"Please fill all the fields"})
    }
    const fileKey = Object.keys(fileObject)[0];
    const file = fileObject[fileKey];
    let fileName = fileObject[fileKey].name;
    let postImage =  Date.now()+fileName
    try {
      file.mv('../public/posts/' + postImage, async function (err) {
        // /React Projects/mern-project/insta-clone/client/public/posts/
        if (err) {
            console.log(err);
            return res.status(404).json({ message: "Something went wrong" })
        } else {
            const createPost=await Post.create({userImage, userName, description, postImage,tags})
            return res.status(200).json({message:"Post created successfully"})   
        }
    })
    } catch (error) {
        console.log(error);
        res.status(404).json({message:"Something went wrong"})
    }
})
router.get('/',async(req,res)=>{
    const allPosts=await Post.find({})
    return res.status(200).json(allPosts)
})
export { router as postRouter }