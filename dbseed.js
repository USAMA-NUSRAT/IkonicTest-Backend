process.chdir(__dirname);
const path = require("path");
const userModel = require("./models/user.model");
const roleModel = require("./models/role.model");
const permissionModel = require("./models/permission.model");
const bcrypt = require("bcrypt");
// const permissionModel = require(path.resolve(
//   __dirname,
//   "./models/permission.model"
// ));

const seed = async () => {
  try {
    const userRole = await roleModel.findOne({ name: "admin" });
    await userModel.deleteOne({ role: userRole?._id });
    await roleModel.deleteMany();
    await permissionModel.deleteMany();
    const permissionsToAdd = [
      { title: "canView", module: "product" },
      { title: "canCreate", module: "product" },
      { title: "canDelete", module: "product" },
      { title: "canUpdate", module: "product" },
    ];
    await permissionModel.insertMany(permissionsToAdd);
    const permissionsAll = await permissionModel.find();
    const adminIds = permissionsAll?.map((permission) => permission._id);
    const userIds = permissionsAll
      ?.filter((permission) => permission.title == "canView")
      .map((ele) => ele._id);

    await roleModel.create({
      name: "admin",
      permissions: adminIds,
    });
    await roleModel.create({
      name: "user",
      permissions: userIds,
    });
    const role = await roleModel.findOne({ name: "admin" });
    await userModel.create({
      name: "admin",
      email: "admin123@gmail.com",
      password: await bcrypt.hash("admin123@", 10),
      role: role?._id,
    });
    console.log("seeder run");
  } catch (err) {
    console.log(err);
  }
};
seed();
