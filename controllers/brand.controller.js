const {
  createBrandService,
  getBrandService,
  getBrandByIdService,
  updateBrandService,
} = require("../services/brand.service");
// =========================create Brand==============================
exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully Created the Brand",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "Couldnot Create Brand",
      error: error,
    });
  }
};

//=================get Brand=================================
exports.getBrands = async (req, res, next) => {
  try {
    const result = await getBrandService();
    res.status(200).json({
      status: "Success",
      message: "Successfully get the Brands",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "Couldnot get Brands",
      error: error,
    });
  }
};
// =====================get brand by id================================
exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getBrandByIdService(id);

    if (!result) {
      return res.status(400).json({
        status: "Failed",
        message: `Couldnot get the Brand ${id}`,
      });
    }

    res.status(200).json({
      status: "Success",
      message: `Successfully get the Brand for ${id}`,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "Couldnot get the Brand",
      error: error,
    });
  }
};
// ========================update brand===========================
exports.updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updateBrandService(id, data);
    console.log(result);
    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "Failed",
        message: "Couldnot updated Brands",
      });
    } else {
      res.status(200).json({
        status: "Success",
        message: "Successfully updated the Brands",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "Couldnot updated Brands",
      error: error,
    });
  }
};
