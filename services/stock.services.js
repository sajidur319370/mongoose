const { default: mongoose } = require("mongoose");
const Stock = require("../models/stock");
const ObjectId = mongoose.Types.ObjectId;

exports.createStockService = async (data) => {
  const result = await Stock.create(data);
  return result;
};
exports.getStockService = async () => {
  /* const result = await Stock.find({}); */
  const result = await Stock.aggregate([
    {
      $match: {
        /* "store.name": "Rajsahi" */
      },
    },
    {
      $group: {
        _id: "$store.name",
        totalProductPrice: { $sum: { $multiply: ["$price", "$quantity"] } },
      },
    },
  ]);
  return result;
};
exports.getStockByIdService = async (id) => {
  /*  const result = await Stock.findOne({ _id: id })
    .populate("store.id")
    .populate("suppliedBy.id")
    .populate("brand.id"); */
  const result = await Stock.aggregate([
    { $match: { _id: new ObjectId(id) } },
    {
      $project: {
        categoty: 1,
        quantity: 1,
        price: 1,
        "brand.name": 1,
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand.name",
        foreignField: "name",
        as: "brandDetails",
      },
    },
  ]);
  return result;
};
