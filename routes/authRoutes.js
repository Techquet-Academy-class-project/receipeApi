const express = require("express");
const {
	signUp,
	login,
	logout,
	changePassword,
} = require("../controllers/authController");
const { isAuthorized } = require("../middleware/authorization");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = express.Router();

router.use(express.json());
router.use(cors());
router.use(cookieParser());

router.post("/signUp", signUp);

router.post("/login", login);

router.get("/logout", logout);

router.put("/change-password", isAuthorized, changePassword);

module.exports = router;
