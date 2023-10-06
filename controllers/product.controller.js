const { log } = require("console");
const Product = require("../models/Product");
const {
  getAllProductService,
  createProductService,
  updateProductServiceById,
  bulkUpdateProductService,
  deleteProductServiceById,
  bulkDeleteProductService,
  getSomeProductService,
} = require("../services/product.services");

// Get Product
exports.getAllProducts = async (req, res, next) => {
  try {
    // const products = await Product.where("name")
    //   .equals(/\w/)
    //   .where("quantity")
    //   .gte(100)
    //   .limit(2)
    //   .sort({ quantity: -1 });

    const products = await getAllProductService();

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
exports.getSomeProducts = async (req, res, next) => {
  try {
    // const products = await Product.where("name")
    //   .equals(/\w/)
    //   .where("quantity")
    //   .gte(100)
    //   .limit(2)
    //   .sort({ quantity: -1 });

    let filters = { ...req.query };

    // Sort -> Page -> Limit  ->
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => {
      delete filters[field];
    });

    // gt|lt|gte|lte
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|lt|gte|lte)\b/g,
      (match) => `$${match}`
    );
    const parsedFilters = JSON.parse(filterString);
    filters = parsedFilters;

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    if (req.query.fields) {
      const anyFields = req.query.fields.split(",").join(" ");
      queries.anyFields = anyFields;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * Number(limit);
      queries.skip = skip;
      queries.limit = Number(limit);
    }

    const products = await getSomeProductService(filters, queries);

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
