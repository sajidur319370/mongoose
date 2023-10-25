const Supplier = require("../models/supplier");

exports.createSupplierService = async (data) => {
  const result = await Supplier.create(data);
  return result;
};
exports.getSupplierService = async () => {
  const result = await Supplier.find({});
  return result;
};
exports.getSupplierByIdService = async (id) => {
  const result = await Supplier.findOne({ _id: id });
  return result;
};
exports.updateSupplierByIdService = async (id, data) => {
  const result = await Supplier.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
