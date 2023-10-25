const { createCategoryService } = require("../services/category.service");

exports.createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully Created the Category",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "Couldnot Create Category",
      error: error,
    });
  }
};
