const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};
const comparePassword = async (password, hashPassword) => {
  const isMatch = await bcrypt.compare(password, hashPassword);
  return isMatch;
};

const generateToken = async (data) => {
  const key = process.env.SECRET_KEY;
  const token = await jwt.sign(data, key, { expiresIn: "2d" });
  return token;
};
module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
};
