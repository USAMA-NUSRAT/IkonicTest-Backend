require("dotenv").config();
const jwt = require("jsonwebtoken");

const key = process.env.SECRET_KEY;

const isValidateToken = async (req, res, next) => {
  try {
    let getToken = req.headers.authorization.split(" ")[1];
    if (!getToken) {
      return res
        .status(401)
        .json({ success: false, message: "'Unauthorized - Token is missing'" });
    } else {
      const decoded = await jwt.verify(getToken, key);

      req.userData = decoded;
      next();
    }
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .json({ success: false, message: "Unauthorized - Invalid token" });
  }
};

module.exports = isValidateToken;
