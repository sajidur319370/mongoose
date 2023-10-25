const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controller");

router
  .route("/")
  .post(storeController.createStore)
  .get(storeController.getStore);

module.exports = router;
