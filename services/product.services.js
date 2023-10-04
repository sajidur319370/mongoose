const Product = require("../models/Product");

exports.getProductService = async () => {
  const products = await Product.find({});

  return products;
};

exports.createProductService = async (data) => {
  const result = await Product.create(data);

  return result;
};

exports.updateProductServiceById = async (id, data) => {
  const result = await Product.updateOne(
    { _id: id },
    // { $set: data },
    { $inc: data },
    {
      runValidators: true,
    }
  );

  // const product = await Product.findById(id);
  // const result = await product.set(data).save();

  return result;
};

exports.bulkUpdateProductService = async (data) => {
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });

  const products = [];

  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });

  const result = await Promise.all(products);
  return result;
};

exports.deleteProductServiceById = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteProductService = async (data) => {
  const result = await Product.deleteMany({ _id: data.ids });
  return result;
};
