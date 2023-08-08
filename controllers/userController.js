const asyncHandler = require("express-async-handler");
const { User } = require("../model/User");
const { Recipe } = require("../model/Recipe");

const getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(
		{ _id: req.params.id },
		"-password"
	).populate("recipes");
	res.json({ data: user });
});

module.exports = { getUser };
