const { Recipe } = require("../model/Recipe");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../model/User");

const addRecipe = asyncHandler(async (req, res) => {
	req.user._id = req.body.createdBy;
	const recipe = await Recipe.create({
		...req.body,
		createdBy: req.user._id,
	});

	await User.updateOne({ _id: req.user._id }, { $push: { recipes: recipe } });
	res.json({ recipe }, "firstName lastName username");
});

const getRecipes = asyncHandler(async (req, res) => {
	const recipes = await Recipe.find({}, "_id recipeName tribe, ingredients").populate(
		"createdBy",
		"firstName lastName username -_id"
	);
	res.json({ recipes });
});

const getRecipe = asyncHandler(async (req, res) => {
	const recipe = await Recipe.findOne({ _id: req.params.id }).populate(
		"createdBy",
		"firstName lastName username"
	);
	if (!recipe)
		return res.json({
			message: `recipe with id ${req.params.id} does not exist`,
		});
	return res.json(recipe);
});

const updateRecipe = asyncHandler(async (req, res) => {
	const recipe = await Recipe.findOne({
		_id: req.params._id,
		createdBy: req.user._id,
	});
	if (!recipe)
		return res.json({
			message: "You cannot update a recipe that's not yours",
			success: false,
		});
	await Recipe.updateOne({ _id: req.params._id }, req.body);
	return res.json({ message: "recipe updated successfully", success: true });
});

const deleteRecipe = asyncHandler(async (req, res) => {
	const recipe = await Recipe.findByIdAndDelete({
		_id: req.params.id,
		createdBy: req.user._id,
	});
	if (!recipe)
		return res.json({
			mesage: "You cannot this recipe because it's not yours",
		});
	return res.json({ message: "recipe successfully deleted" });
});


const myMeals = asyncHandler(async (req, res) => {
	const meals = await User.findById({_id: req.user._id}).select("recipes -_id").populate("recipes", "recipeName tribe");
	res.json({meals})
});


module.exports = {
	addRecipe,
	getRecipes,
	getRecipe,
	updateRecipe,
	deleteRecipe,
	myMeals,
};
