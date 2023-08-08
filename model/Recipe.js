const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
	{
		recipeName: {
			type: String,
			required: [true, "Enter the recipe name"],
			unique: true,
			immutable: true,
		},

		tribe: {
			type: String,
			required: true,
		},

		ingredient: [String],

		cookingProcess: [
			{
				step: Number,
				detail: String,
			},
		],

		createdBy: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports.Recipe = new mongoose.model("Recipe", recipeSchema);
