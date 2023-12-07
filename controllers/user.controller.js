const userModel = require("../models/user.model");
const roleModel = require("../models/role.model");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../utils/user.utils");
exports.SignUp = async (req, res) => {
  try {
    if (req.body) {
      const { name, email, password } = req.body;
      const userResult = await userModel.findOne({ email });
      if (userResult) {
        return res
          .status(409)
          .json({ message: "user already exist!", success: false });
      } else {
        const role = await roleModel.findOne({ name: "user" });
        const pass = await hashPassword(password);
        const user = {
          name,
          email,
          password: pass,
          role: role._id,
        };
        const data = new userModel(user);
        const result = await data.save();
        return res.status(201).json({
          message: "successfully created",
          success: true,
          data: result,
        });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Request" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.Login = async (req, res) => {
  try {
    if (req.body) {
      const { email, password } = req.body;
      const userData = await userModel.findOne({ email }).populate({
        path: "role",
        populate: {
          path: "permissions",
        },
      });
      if (userData) {
        const isMatch = await comparePassword(password, userData.password);

        if (isMatch) {
          const permissions_ = userData.role.permissions.map((ele) => {
            return { title: ele.title, module: ele.module };
          });

          const data = {
            id: userData._id,
            name: userData.email,
            role: userData.role.name,
            permissions_,
          };

          const token = await generateToken(data);
          return res
            .status(200)
            .json({ message: "Login Successful", token, result: data });
        } else {
          return res.status(401).json({
            message: "Unauthorized - Invalid credentials",
            success: false,
          });
        }
      } else {
        return res
          .status(404)
          .json({ message: "user not exist", success: false });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Request" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
