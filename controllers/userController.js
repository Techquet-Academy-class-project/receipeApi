const asyncHandler = require("express-async-handler");
const { User } = require("../model/User");
const { Recipe } = require("../model/Recipe");

const getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(
		{ _id: req.params.id },
		"-password -createdAt -lastPasswordUpdate -updatedAt"
	).populate("recipes", "recipeName tribe ingredient");
	res.json({ data: user });
});

const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find(
		{},
		"-password -createdAt -lastPasswordUpdate -updatedAt"
	).populate("recipes", "recipeName");
	return res.json({ data: users, success: true });
});

const userProfile = asyncHandler(async (req, res) => {
	const userInfo = await User.findOne(
		{ _id: req.user._id },
		"-recipes -password -lastPasswordUpdate -createdAt -updatedAt"
	);
	const user = await User.find({ _id: req.user._id }).select("recipes");
	const mealLength = user.map((value) => value.recipes.length);
	return res.json({ userInfo, NumberOfMeals: Number(mealLength.join("")) });
});

module.exports = { getUser, getUsers, userProfile };
