const Brand = require("../models/brand");

exports.createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
};
exports.getBrandService = async () => {
  const result = await Brand.find({}).populate("products");
  return result;
};
exports.getBrandByIdService = async (id) => {
  const result = await Brand.findOne({ _id: id });
  return result;
};
exports.updateBrandService = async (id, data) => {
  const result = await Brand.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
