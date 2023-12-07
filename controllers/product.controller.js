const productModel = require("../models/product.model");

exports.CreateProduct = async (req, res) => {
  try {
    if (req.body) {
      console.log(req.userData, "userDataa");
      req.body.image = req.files && req.files[0].filename;
      req.body.createdBy = req.userData.id;
      const data = new productModel(req.body);
      const result = await data.save();
      return res
        .status(201)
        .json({ message: "product added", success: true, data: result });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Bad Request", success: false });
  }
};

exports.GetProducts = async (req, res) => {
  try {
    const data = await productModel.find();
    return res.status(200).json({ message: "success", success: true, data });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "some thing went wrong", success: false });
  }
};

exports.DeleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let getDeleteProduct = await productModel.deleteOne({ _id: id });
    if (getDeleteProduct.deletedCount == 1) {
      res.status(200).json({
        success: true,
        message: "Product Deleted",
      });
    } else {
      res.status(422).json({ success: false, message: "Not Deleted" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.UpdateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    req.body.image = req.files[0].filename;
    let updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
      upsert: true,
    });

    res.status(200).json({
      success: true,
      result: updatedProduct,
      message: " successfully updated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
