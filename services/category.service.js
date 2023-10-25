const Category = require("../models/category");

exports.createCategoryService = async (data) => {
  const result = await Category.create(data);
  return result;
};
