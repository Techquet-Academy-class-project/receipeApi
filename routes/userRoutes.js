const express = require("express");
const { getUser, getUsers, userProfile, } = require("../controllers/userController");
const { isAuthorized } = require("../middleware/authorization");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = express.Router();

router.use(express.json());
router.use(cors());
router.use(cookieParser());


router.get("/user-profile", isAuthorized, userProfile);
router.get("/all-users", getUsers);
router.get("/:id", isAuthorized, getUser);



module.exports = router;
