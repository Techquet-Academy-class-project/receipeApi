const express = require("express");
const { getUser } = require("../controllers/userController");
const { isAuthorized } = require("../middleware/authorization");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = express.Router();

router.use(express.json());
router.use(cors());
router.use(cookieParser());

router.get("/get-user/:id", isAuthorized, getUser);

module.exports = router;
