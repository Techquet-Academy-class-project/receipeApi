const express = require("express");
const { getUser, getUsers, userProfile, } = require("../controllers/userController");
const { isAuthorized } = require("../middleware/authorization");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = express.Router();

router.use(express.json());
router.use(cors());
router.use(cookieParser());


router.get("/get-user/:id", isAuthorized, getUser);
router.get("/user-profile", isAuthorized, userProfile);
router.get("/get-users", getUsers);



module.exports = router;
