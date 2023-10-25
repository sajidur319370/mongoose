const {
  createStoreService,
  getStoreService,
} = require("../services/store.service");
// ===============create=================================
exports.createStore = async (req, res, next) => {
  try {
    const result = await createStoreService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully created Store",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "Couldn't created Store",
      error: error,
    });
  }
};
// ===============get=================================
exports.getStore = async (req, res, next) => {
  try {
    const result = await getStoreService();
    res.status(200).json({
      status: "Success",
      message: "Successfully get Store",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get Store",
      error: error,
    });
  }
};
