const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User } = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();




const signUp = asyncHandler(async (req, res) => {
  const { password, ...others } = req.body;
  if (password.length < 8 || password.length > 15)
  return res.json({
    message: "password must be less than 15 and greater than 8",
    success: false,
  });
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { password: hashedPassword, ...others };
  const user = await User.create(newUser);
  const token = jwt.sign({
    _id: user._id, 
    username: user.username,
    email: user.email,}, process.env.SECRET_KEY);
    res.cookie("authorization", token);
    return res.json({data: user, message: "user successfully created"});
});


const login = asyncHandler(async (req, res) => {
  const {username, password } = req.body;
  const user = await User.findOne({ username });
  if(!user) return res.json({ data: null, message: "this user doesn't exist"});
  const check = await bcrypt.compare(password, user.password);
  if(!check) return res.json({ data: null, message: "authentication failed"});

  const token = jwt.sign({ 
    _id: user._id, username: user.username }, process.env.SECRET_KEY);
    res.cookie("authorization", token);
    return res.json({ message: "login successful", success: true});
});


const logout = asyncHandler(async (req, res) => {
  res.cookie("authorization", "", {maxAge: 1});
  return res.json({ message: "successfully logged out", success: true});
});


const changePassword = asyncHandler(async (req, res) => {
  const userPassword = req.body.password;
  if (userPassword.length < 8) return res.status(401).json({
    message: "password cannot be less than 8 digits",
    success: false,
  });
  const hashedPassword = await bcrypt.hash(userPassword, 10);
  await User.updateOne({ _id: req.user.id }, { password: hashedPassword});
  res.status(200).json({ message: "password successfully updated", success: true});
});

module.exports = { signUp, login, logout, changePassword };