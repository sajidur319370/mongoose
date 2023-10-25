const {
  createStockService,
  getStockService,
  getStockByIdService,
} = require("../services/stock.services");

// =========================create Stock==============================
exports.createStock = async (req, res, next) => {
  try {
    const result = await createStockService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully created Stock",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "Couldn't created Stock",
      error: error,
    });
  }
};
// =========================get Stock==============================
exports.getStock = async (req, res, next) => {
  try {
    const result = await getStockService();
    res.status(200).json({
      status: "Success",
      message: "Successfully got Stock",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get Stock",
      error: error,
    });
  }
};
// =========================get Stock By id==============================
exports.getStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getStockByIdService(id);
    if (!result) {
      res.status(400).json({
        status: "Failed",
        message: "Couldn't get Stock",
        error: error,
      });
    } else {
      res.status(200).json({
        status: "Success",
        message: "Successfully got Stock",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get Stock",
      error: error,
    });
  }
};
