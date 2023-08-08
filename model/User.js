const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "first name is mandatory"],
		},
		lastName: {
			type: String,
			required: [true, "last name is mandatory"],
		},
		username: {
			type: String,
			required: [true, "Please enter your username"],
			unique: true,
		},
		email: {
			type: String,
			required: [true, "Please enter your email"],
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: [true, "Please enter your password"],
			minLength: [8, "Password cannot be less than eight digits"],
		},
		recipes: [
			{
				type: mongoose.SchemaTypes.ObjectId,
				ref: "Recipe",
				required: true,
			},
		],
	},
	{ timestamps: true }
);

module.exports.User = new mongoose.model("User", userSchema);
