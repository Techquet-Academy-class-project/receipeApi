const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { User } = require("../model/User");

const isAuthorized = asyncHandler(async (req, res, next) => {
	const token = req.cookies.authorization;
	if (!token)
		return res.status(401).json({
			message: "Authentication failed, please log in",
			success: true,
			data: null,
		});
	const decodedData = jwt.verify(token, process.env.SECRET_KEY);

	const user = await User.findById(decodedData._id).populate("recipes");
	const iat = decodedData.iat * 1000;
	if (iat < new Date(user.lastPasswordUpdate).getTime())
		return res.status(401).json({
			message: "request failed, enter correct password",
			success: false,
		});
	if (!user)
		return res.json({
			data: user,
			message: "No user found",
			success: false,
		});
	req.user = user;
	next();
});

module.exports = { isAuthorized };
