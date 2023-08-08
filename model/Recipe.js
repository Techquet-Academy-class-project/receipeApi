const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
	{
		name: {
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

		process: [
			{
				step: Number,
				detail: String,
			}],

		createdBy: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports.Recipe = new mongoose.model("Recipe", recipeSchema);
