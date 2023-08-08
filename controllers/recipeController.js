const { Recipe } = require("../model/Recipe");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../model/User");

const addRecipe = asyncHandler(async (req, res) => {
	req.user._id = req.body.createdBy;
	const recipe = await Recipe.create({ ...req.body, createdBy: req.user._id });

	await User.updateOne({ _id: req.user._id }, { $push: { recipes: recipe } });
	res.json({ recipe, message: "recipe successfully created", success: true });
});

const getRecipes = asyncHandler(async (req, res) => {
	const recipes = await Recipe.find({});
	res.json({ data: recipes, success: true });
});


const getRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findOne({_id: req.params.id}).populate("createdBy", "-password");
  res.json(recipe);
});

module.exports = { addRecipe, getRecipes, getRecipe };
