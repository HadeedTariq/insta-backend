import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  const { name, email, password, userImage } = req.body;
  if (!name || !email || !password) {
    return res.status(404).json({ message: "Please fill all the fields" });
  }
  const user = await User.findOne({ name });
  if (user) {
    return res.status(404).json({ message: "User already existed" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
};
const authenticateUser = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password)
    return res.status(404).json({ message: "Please fill all the fields" });
  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isPasswordVerified = await bcrypt.compare(password, user.password);
    if (!isPasswordVerified)
      return res.status(404).json({ message: "Password Incorrect" });
    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
        userImage: user.userImage,
        description: user.description,
        hobby: user.hobby,
      },
      process.env.JWT_SECRET
    );
    res.cookie("instaUser", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      domain: ".vercel.app",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "User loged in successfully" });
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
};
const deleteUser = async (req, res) => {
  const { instaUser } = req.body;
  try {
    if (!instaUser) return res.status(404).json({ message: "Not token found" });
    const user = jwt.verify(instaUser, process.env.JWT_SECRET);
    if (!user) return res.status(404).json({ message: "Invalid Token" });
    await User.deleteOne({ name: user.name });
    return res
      .cookie("instaUser", "", {
        httpOnly: true,
        sameSite: "strict",
        domain: ".vercel.app",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "User deleted  successfully" });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Something went wrong" });
  }
};

const updateUserPassword = async (req, res) => {
  const { name, oldPassword, newPassword } = req.body;
  if (!name || !oldPassword || !newPassword)
    return res.status(404).json({ message: "Please fill all the fields" });
  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isPasswordVerified = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordVerified)
      return res.status(404).json({ message: "Password Incorrect" });
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(
      { _id: user._id },
      { password: newHashedPassword }
    );
    response.set(
      "A-Control-Allow-Origin",
      "https://insta-frontend-six.vercel.app"
    );
    return res
      .cookie("instaUser", "", {
        httpOnly: true,
        sameSite: "strict",
        domain: ".vercel.app",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Password Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Something went wrong" });
  }
};
const updateUserDetails = async (req, res) => {
  const { name, description, hobby, userImage } = req.body;
  if (!name || !hobby || !description || !userImage)
    return res.status(404).json({ message: "Please fill all the fields" });
  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ message: "User not found" });
    await User.findByIdAndUpdate(
      { _id: user._id },
      { description: description, hobby: hobby, userImage: userImage }
    );
    return res
      .cookie("instaUser", "", {
        httpOnly: true,
        sameSite: "strict",
        domain: ".vercel.app",
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Saved Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Something went wrong" });
  }
};

const getSingleUser = async (req, res) => {
  const { instaUser } = req.cookies;
  try {
    if (!instaUser) return res.status(404).json({ message: "Not token found" });
    const user = jwt.verify(instaUser, process.env.JWT_SECRET);
    if (!user) return res.status(404).json({ message: "Invalid Token" });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Something went wrong" });
  }
};
const getAllUser = async (req, res) => {
  const user = await User.find({});
  const users = user.map((single) => {
    return {
      name: single.name,
      userImage: single.userImage,
      description: single.description,
      hobby: single.hobby,
    };
  });
  return res.status(200).json(users);
};
const logOutUser = async (req, res) => {
  return res
    .cookie("instaUser", "", {
      httpOnly: true,
      sameSite: "strict",
      domain: ".vercel.app",
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({ message: "User loged out successfully" });
};

export {
  createUser,
  deleteUser,
  authenticateUser,
  getAllUser,
  updateUserPassword,
  getSingleUser,
  logOutUser,
  updateUserDetails,
};
