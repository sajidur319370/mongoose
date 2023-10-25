const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");

router.route("/signup").post(userController.signup);
router.route("/signup/confirmation/:token").get(userController.confirmEmail);
router.route("/login").post(userController.login);
router.route("/me").get(verifyToken, userController.getMe);

module.exports = router;
