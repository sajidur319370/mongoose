const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploader");

const productController = require("../controllers/product.controller");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");

// router.post("/upload", upload.single("image"), productController.fileUpload);
router.post("/upload", upload.array("image"), productController.fileUpload);

router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

router
  .route("/")
  .get(productController.getAllProducts)
  .get(productController.getSomeProducts)
  .post(
    verifyToken,
    authorization("admin", "manager"),
    productController.createProduct
  );

router
  .route("/:id")
  .patch(productController.updateProductById)
  .delete(productController.deleteProductById);
module.exports = router;
