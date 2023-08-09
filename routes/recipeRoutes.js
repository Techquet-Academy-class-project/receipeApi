const express = require("express");
const {
	addRecipe,
	getRecipes,
	getRecipe,
	updateRecipe, 
  deleteRecipe, 
	myMeals} = require("../controllers/recipeController");

const { isAuthorized } = require("../middleware/authorization");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = express.Router();

router.use(express.json());
router.use(cors());
router.use(cookieParser());

router.get("/get-recipe/:id", isAuthorized, getRecipe);
router.put("/update-recipe/:id", isAuthorized, updateRecipe);
router.delete("/delete-recipe/:id", isAuthorized, deleteRecipe);
router.post("/add-recipe", isAuthorized, addRecipe);
router.get("/mymeals", isAuthorized, myMeals);
router.get("/get-recipes", getRecipes);

module.exports = router;
