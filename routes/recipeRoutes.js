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


router.post("/recipe", isAuthorized, addRecipe);
router.get("/my-meals", isAuthorized, myMeals);
router.get("/all-recipes", getRecipes);
router.delete("/:id", isAuthorized, deleteRecipe);
router.get("/:id", isAuthorized, getRecipe);
router.patch("/recipe/:id", isAuthorized, updateRecipe);

module.exports = router;
