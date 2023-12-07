const express = require("express");
const checkPermission = require("../middleware/checkPermission");
const isValidateToken = require("../middleware/tokenValidation");
const router = express.Router();
const multer = require("multer");
const {
  CreateProduct,
  GetProducts,
  DeleteProduct,
  UpdateProduct,
} = require("../controllers/product.controller");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    console.log("now i am in multer");
    cb(null, Date.now() + file.originalname);
  },
});

const uploads = multer({ storage }).any();
router.post(
  "/product/create",
  isValidateToken,
  checkPermission("product", "canCreate"),
  uploads,
  CreateProduct
);

router.get("/product/find", GetProducts);
router.delete(
  "/product/delete/:id",

  isValidateToken,
  checkPermission("product", "canDelete"),
  DeleteProduct
);
router.put(
  "/product/update/:id",
  isValidateToken,
  checkPermission("product", "canUpdate"),
  uploads,
  UpdateProduct
);

module.exports = router;
