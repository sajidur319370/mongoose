const Product = require("../models/Product");
const {
  getProductService,
  createProductService,
  updateProductServiceById,
  bulkUpdateProductService,
  deleteProductServiceById,
  bulkDeleteProductService,
} = require("../services/product.services");

// Get Product
exports.getProducts = async (req, res, next) => {
  try {
    // const products = await Product.where("name")
    //   .equals(/\w/)
    //   .where("quantity")
    //   .gte(100)
    //   .limit(2)
    //   .sort({ quantity: -1 });

    const products = await getProductService();

    res.status(200).json({
      status: "Success",
      message: "Data Got Successfully",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Can't get data",
      error: error.message,
    });
  }
};

// Create product

exports.createProduct = async (req, res, next) => {
  try {
    //save or create
    const result = await createProductService(req.body);
    result.logger();

    // const product = new Product(req.body);

    // if (product.quantity == 0) {
    //   product.status = "Out of Stock";
    // }
    // const result = await product.save();
    res.status(200).json({
      status: "Success",
      message: "Data inserted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

// Update Product
exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updateProductServiceById(id, data);
    res.status(200).json({
      status: "Success",
      message: "Data Updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data is not Updated",
      error: error.message,
    });
  }
};

// Bullk-Update product

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await bulkUpdateProductService(data);
    res.status(200).json({
      status: "Success",
      message: "Bulk Update done Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Bulk update not Done !!!",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductServiceById(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "Failed",
        message: "No Data is Deleted",
        error: error.message,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Data Deleted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "No Data is Deleted",
      error: error.message,
    });
  }
};

// Bullk-Delete product

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await bulkDeleteProductService(data);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "Failed",
        message: "No Data is Deleted",
        error: error.message,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully deleted the products",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "No product is deleted",
      error: error.message,
    });
  }
};
