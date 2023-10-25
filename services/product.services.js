const Product = require("../models/Product");
const Brand = require("../models/brand");
// ________________________________________________________________________
exports.getAllProductService = async () => {
  //{ price: { $gte: 300 } }
  const products = await Product.find({});
  return products;
};

// _____________________________________________________________________________
exports.getSomeProductService = async (filters, queries) => {
  // const products = await Product.find({}).sort("name price quantity");
  const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.anyFields)
    .sort(queries.sortBy);

  const productTotal = await Product.countDocuments(filters);
  const pageTotal = Math.ceil(productTotal / queries.limit);
  return { pageTotal, productTotal, products };
};

// _________________________________________________________________________
exports.createProductService = async (data) => {
  const product = await Product.create(data);

  const { _id: productId, brand } = product;

  // update brand
  const brandResult = await Brand.updateOne(
    { _id: brand?.id },
    { $push: { products: productId } }
  );
  return product;
};

// ______________________________________________________________________________;
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

// _________________________________________________________________________;
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

// _________________________________________________________________;
exports.deleteProductServiceById = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

// ______________________________________________________________________;
exports.bulkDeleteProductService = async (data) => {
  const result = await Product.deleteMany(/* { _id: data.ids } */);
  return result;
};
