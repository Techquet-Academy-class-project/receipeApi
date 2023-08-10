const asyncHandler = require("express-async-handler");
const { User } = require("../model/User");
const { Recipe } = require("../model/Recipe");

const getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(
		{ _id: req.params.id },
		"-password -lastPasswordUpdate -createdAt -updatedAt"
	).populate("recipes", "recipeName tribe ingredient");
	res.json({ data: user });
});

const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({},"-password -lastPasswordUpdate -createdAt -updatedAt");
	return res.json({ data: users, success: true });
});

const userProfile = asyncHandler(async (req, res) => {
	const userInfo = await User.find({ _id: req.user._id }, "-recipes");
	const user = await User.find({ _id: req.user._id }).select("recipes -_id");
	const cydd = user.map((value) => value.recipes.length);
	return res.json({ userInfo, NumberOfMeals: Number(cydd.join("")) });
});

module.exports = { getUser, getUsers, userProfile };
