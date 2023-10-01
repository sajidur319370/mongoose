const Product = require("../models/Product");
const {
  getProductService,
  createProductService,
} = require("../services/product.services");

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
