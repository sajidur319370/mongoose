const express = require("express");
const categoryControllers = require("../controllers/category.controller");
const router = express.Router();

router.route("/").post(categoryControllers.createCategory);

module.exports = router;
