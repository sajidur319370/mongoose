const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stock.controller");

router
  .route("/")
  .post(stockController.createStock)
  .get(stockController.getStock);

router.route("/:id").get(stockController.getStockById);
module.exports = router;
