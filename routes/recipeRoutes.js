const express = require("express");
const {
	addRecipe,
	getRecipes,
	getRecipe,
} = require("../controllers/recipeController");

const { isAuthorized } = require("../middleware/authorization");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = express.Router();

router.use(express.json());
router.use(cors());
router.use(cookieParser());

router.post("/add-recipe", isAuthorized, addRecipe);
router.get("/get-recipe/:id", isAuthorized, getRecipe);
router.get("/get-recipes", getRecipes);

module.exports = router;
