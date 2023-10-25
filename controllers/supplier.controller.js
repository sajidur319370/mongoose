const {
  createSupplierService,
  getSupplierService,
  getSupplierByIdService,
  updateSupplierByIdService,
} = require("../services/supplier.service");

exports.createSupplier = async (req, res, next) => {
  try {
    const result = await createSupplierService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully Created the Supplier",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "Couldnot Create Supplier",
      error: error,
    });
  }
};
exports.getSupplier = async (req, res, next) => {
  try {
    const result = await getSupplierService();
    res.status(200).json({
      status: "Success",
      message: "Successfully get the Supplier",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get Supplier",
      error: error,
    });
  }
};
exports.getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getSupplierByIdService(id);

    if (!result) {
      return res.status(400).json({
        status: "Failed",
        message: `Couldnot get the Supplier ${id}`,
      });
    }

    res.status(200).json({
      status: "Success",
      message: `Successfully get the Supplier for ${id}`,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "Couldnot get the Supplier",
      error: error,
    });
  }
};
exports.updateSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updateSupplierByIdService(id, data);
    console.log(result);
    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "Failed",
        message: "Couldn't update Supplier",
      });
    } else {
      res.status(200).json({
        status: "Success",
        message: "Successfully updated the Supplier",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      message: "Couldn't updated Supplier",
      error: error,
    });
  }
};
